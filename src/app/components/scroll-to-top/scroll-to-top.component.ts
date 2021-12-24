import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
	button: HTMLElement | null = null;
	@HostListener('window:scroll', ['$event']) 
		onScroll(event: any) {
			if (window.scrollY > 650 && this.button) this.button.style.right = "15px";
			else if (window.scrollY < 650 && this.button) this.button.style.right = "-100px";
 		}

  	constructor() { }

	ngOnInit(): void {
		this.button = document.getElementById("stp");
	}

	scroll() {
		window.scroll(0, 0);
	}
}
