import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Matrimony_app';
  hideText: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkRoute();
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute(): void {
    const currentRoute = this.router.url; // Get the current URL
    // Update `hideText` based on the current route
    this.hideText = currentRoute.includes('detail/') || currentRoute.includes('daily-suggestions');
  }
}
