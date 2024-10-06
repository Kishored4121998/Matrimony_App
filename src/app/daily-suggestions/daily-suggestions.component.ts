import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { Suggestion } from '../suggestion.model';

@Component({
  selector: 'app-daily-suggestions',
  templateUrl: './daily-suggestions.component.html',
  styleUrls: ['./daily-suggestions.component.css']
})
export class DailySuggestionsComponent implements OnInit {
  suggestions: Suggestion[] = [];
  currentIndex: number = 0;
  startX: number = 0;

  constructor(private suggestionService: SuggestionsService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestions().subscribe(
      (data: Suggestion[]) => {
        this.suggestions = data;
        console.log(this.suggestions);
      },
      (error) => {
        console.error('Error loading suggestions:', error);
      }
    );
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    const endX = event.clientX;
    const distance = endX - this.startX;

    if (distance > 50) {
      this.onInterested();
    } else if (distance < -50) {
      this.onNotInterested();
    }
  }

  onInterested(): void {
    this.openSnackBar(`Interested in ${this.suggestions[this.currentIndex]?.name}`);
    this.moveToNextSuggestion('right');
  }

  onNotInterested(): void {
    this.openSnackBar(`Not Interested in ${this.suggestions[this.currentIndex]?.name}`);
    this.moveToNextSuggestion('left');
  }

  moveToNextSuggestion(direction: string): void {
    const cardElement = document.querySelectorAll('.stacked-card')[this.currentIndex];
    if (cardElement) {
      cardElement.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');
    }

    setTimeout(() => {
      if (this.currentIndex < this.suggestions.length - 1) {
        this.currentIndex++;
      } else {
        this.openSnackBar('No more suggestions.');
      }
      
      if (cardElement) {
        cardElement.classList.remove('swipe-right', 'swipe-left');
      }
    }, 300);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0].clientX;
    const distance = endX - this.startX;

    if (distance > 50) {
      this.onInterested();
    } else if (distance < -50) {
      this.onNotInterested();
    }
  }
}
