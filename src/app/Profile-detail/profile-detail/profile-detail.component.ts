import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  profile: any;
  private profilesUrl = 'assets/profiles.json';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProfile(id);
      }
    });
  }

  fetchProfile(id: string | null) {
    if (id) {
      this.http.get<any[]>(this.profilesUrl).subscribe(profiles => {
        this.profile = profiles.find(profile => profile.id === parseInt(id, 10));
      }, error => {
        console.error("Error loading profiles:", error);
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
