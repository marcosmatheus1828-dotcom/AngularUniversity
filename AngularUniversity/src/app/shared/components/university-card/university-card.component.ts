import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { University } from '../../../core/models/university.model';

@Component({
  selector: 'app-university-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './university-card.component.html',
  styleUrl: './university-card.component.scss',
})
export class UniversityCardComponent {
  @Input({ required: true }) university!: University;
  @Input() isFavorite = false;

  @Output() toggleFavorite = new EventEmitter<University>();

  get primaryDomain(): string {
    return this.university.domains?.[0] ?? '—';
  }

  get primaryWebsite(): string {
    return this.university.web_pages?.[0] ?? '';
  }

  openWebsite(): void {
    if (this.primaryWebsite) {
      window.open(this.primaryWebsite, '_blank', 'noopener');
    }
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.university);
  }
}
