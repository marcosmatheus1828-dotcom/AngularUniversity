import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UniversityCardComponent } from '../../shared/components/university-card/university-card.component';
import { FavoritesService } from '../../core/services/favorites.service';
import { University } from '../../core/models/university.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, UniversityCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  constructor(public favoritesService: FavoritesService) {}

  onToggleFavorite(university: University): void {
    this.favoritesService.toggle(university);
  }

  clearAll(): void {
    this.favoritesService.clear();
  }
}
