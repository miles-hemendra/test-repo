import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("scroll", function() {
      console.log('pos', window.pageYOffset);
      let pos = window.pageYOffset;
      if(pos > 100) {
        document.getElementById('landing-page')?.classList.add('sticky-header');
      } else {
        document.getElementById('landing-page')?.classList.remove('sticky-header');
      }
    }, {passive: true});
  }

}
