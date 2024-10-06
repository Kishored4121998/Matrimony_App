import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: any[] = [];
  currentIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/profiles.json').subscribe(data => {
      this.profiles = data;
      this.currentIndex = 0;
    }, error => {
      console.error("Error loading profiles:", error);
    });
  }

  onProfileAction(event: { action: string, profile: any }) {
    console.log(`Action: ${event.action}, Profile:`, event.profile);
    this.nextProfile();
  }

  nextProfile() {
    if (this.currentIndex < this.profiles.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevProfile() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.profiles.length - 1;
    }
  }
}
