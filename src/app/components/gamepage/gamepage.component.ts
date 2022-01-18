import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clip, DetailedGameResponse, Review, Screenshot, Trailer } from 'src/app/Models/Types';
import { BackendService } from 'src/app/services/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RawgService } from 'src/app/services/rawg.service';
import { TwitchserviceService } from 'src/app/services/twitchservice.service';

@Component({
	selector: 'app-gamepage',
	templateUrl: './gamepage.component.html',
	styleUrls: ['./gamepage.component.scss']
})
export class GamepageComponent implements OnInit {
	game: DetailedGameResponse | undefined;
	gameId: string | undefined;
	screenshots: Screenshot[] = new Array();
	parsedDescription: string | null = null;
	reviews: Review[] = new Array();
	review: Partial<Review> = {}
	localStorage: Storage | undefined;
	clips: Clip[] = new Array();
	reviewErrors: string[] = new Array();
	averageRating: number | undefined;
	isAdmin: boolean | undefined;
	ownReviewId: string | undefined;
	mainTrailer: Trailer | undefined;

	formatVote(value: number) {
		return `${value}/10`;
	}

	stripUrl(url: string | undefined) {
		if (!url) return undefined;

		url = url.replace("http://", "").replace("https://", "");

		if (url.endsWith("/")) url = url.substring(0, url.length - 1);

		return url;
	}

	private parseHTML(description: string) {
		return description
			.replaceAll("&lt;", "<")
			.replaceAll("&gt;", ">")
			.replaceAll("&#39;", "'");
	}

	private setWindowTitle() {
		document.title = this.game?.name!;
	}

	private getReviews() {
		this.backendService
			.getReviews(this.gameId!)
			.subscribe(res => {
				this.reviews = res.reviews;
				this.averageRating = res.average;
				const ownReview = this.reviews.find(item => item.reviewedBy === localStorage.getItem("username"));
				if (ownReview) {
					Object.assign(this.review, ownReview);
					this.ownReviewId = ownReview._id
				}
				else {
					this.review = { gameId: this.gameId };
					this.ownReviewId = undefined;
				} 
			})
	}

	constructor(private twitchService: TwitchserviceService, private backendService: BackendService, private activatedRoute: ActivatedRoute, private rawgService: RawgService, private router: Router, public localStorageService: LocalstorageService) { 
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
		window.scroll(0, 0);

		this.backendService
			.getHome()
			.subscribe(res => {
				if (!res.isLoggedIn) localStorage.clear();
				if (res.isAdmin) this.isAdmin = res.isAdmin;
			})

		this.localStorage = this.localStorageService.getLocalStorage();

		this.gameId = this.activatedRoute.snapshot.params['id'];

		if (isNaN(Number(this.gameId))) {
			this.router.navigateByUrl('/poppingames');
			return;
		}

		this.review.gameId = this.gameId;
	
		this.rawgService
			.getGameById(this.gameId!)
			.subscribe(res => {
				this.game = res;
				this.game.description = this.parseHTML(this.game.description);
				this.setWindowTitle();

				this.twitchService
					.getIdByName(this.game?.name!)
					.subscribe(res => {
						if (res.data[0]?.id)
							this.twitchService
								.getClipsById(res.data[0].id)
								.subscribe(res => {
									this.clips = res.data;
								})
					})
			})

		this.rawgService
			.getScreenshots(this.gameId!)
			.subscribe(res => {
				this.screenshots = res.results;
			})

		this.rawgService
			.getTrailers(this.gameId!)
			.subscribe(res => {
				if (res.results.length > 0)
					this.mainTrailer = res.results[0];
			})

		this.getReviews();
	}

	updateVote() {
		const slider = document.getElementById("rating");
		this.review.rating = parseFloat(slider?.ariaValueNow!);
	}

	sendReview() { 
		this.updateVote();
		this.reviewErrors.splice(0);
		
		if (!this.review.reviewContent) this.reviewErrors.push("Recensione non valida!");
		else if (this.review.reviewContent?.length < 1 || this.review.reviewContent?.length > 140) 
			this.reviewErrors.push("La recensione deve essere tra 1 e 140 caratteri!");

		if (this.review.rating === undefined) this.reviewErrors.push("Voto non valido!");
		else if (this.review.rating < 0.0 || this.review.rating > 10.0)
			this.reviewErrors.push("Il voto deve essere tra 0.0 e 10.0!");
		
		if (this.reviewErrors.length === 0) 
			this.backendService
				.sendReview(this.review)
				.subscribe(_ => {
					this.getReviews();
				});
	}

	setRedirectUrl() {
		localStorage.setItem("redirectUrl", this.router.url);
	}

	checkBroadcasterName(broadcasterName: string) {
		const regex = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
		return regex.test(broadcasterName);
	}

	deleteReview(id: string) {
		this.backendService
			.deleteReview(id)
			.subscribe(_ => {
				this.getReviews();
			})
	}

}
