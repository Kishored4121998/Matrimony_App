import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: any;
  @Output() actionTaken = new EventEmitter<{ action: string, profile: any }>();
  showError: boolean = false;
  isShortlisted: boolean = false;
  startX: number = 0;
  endX: number = 0;

  constructor(private snackBar: MatSnackBar, private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    if (!this.profile) {
      this.showError = true;
      console.error("No profiles found.");
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    if (this.startX - this.endX > swipeThreshold) {
      this.decline();
    } else if (this.endX - this.startX > swipeThreshold) {
      this.accept(this.profile);
    }
  }

  viewProfile(profile: any) {
    this.router.navigate(['/detail', profile.id]);
  }

  accept(profile: any) {
    this.snackBar.open('Interested in ' + this.profile.name, '', { duration: 2000 });
    this.actionTaken.emit({ action: 'accept', profile: this.profile });
    console.log(this.profile.id);
    this.router.navigate(['/detail', this.profile.id]);
  }

  decline() {
    this.snackBar.open('Not Interested in ' + this.profile.name, '', { duration: 2000 });
    this.actionTaken.emit({ action: 'decline', profile: this.profile });
  }

  shortlist() {
    this.snackBar.open(this.profile.name + ' Shortlisted!', '', { duration: 2000 });
    this.isShortlisted = true;
    this.actionTaken.emit({ action: 'shortlist', profile: this.profile });
  }
}
