import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const COMMON_COUNTRIES = [
  'Brazil',
  'Canada',
  'Australia',
  'Germany',
  'Japan',
  'United States',
  'Portugal',
  'Spain',
  'France',
  'Italy',
  'United Kingdom',
  'Argentina',
];

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() country = '';
  @Input() loading = false;
  @Output() countryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  readonly suggestions = COMMON_COUNTRIES;

  onInputChange(value: string): void {
    this.country = value;
    this.countryChange.emit(value);
  }

  onSubmit(): void {
    const trimmed = this.country.trim();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }

  selectSuggestion(country: string): void {
    this.country = country;
    this.countryChange.emit(country);
    this.search.emit(country);
  }
}
