import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SearchHistoryService } from '../../core/services/search-history.service';
import { AuDatePipe } from '../../shared/pipes/au-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, MatIconModule, MatButtonModule, AuDatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  country = '';

  constructor(
    private router: Router,
    public historyService: SearchHistoryService
  ) {}

  onSearch(country: string): void {
    this.router.navigate(['/resultados'], { queryParams: { country } });
  }

  repeatSearch(country: string): void {
    this.onSearch(country);
  }

  clearHistory(): void {
    this.historyService.clear();
  }
}
