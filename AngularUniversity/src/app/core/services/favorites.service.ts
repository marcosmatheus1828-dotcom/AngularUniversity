import { Injectable, signal } from '@angular/core';

import { FavoriteUniversity, University } from '../models/university.model';
import { StorageService } from './storage.service';

const FAVORITES_KEY = 'au_favorites';

/**
 * Gerencia a lista de universidades favoritas, persistida em
 * Local Storage. Expõe um signal para que componentes reajam
 * automaticamente a alterações (favoritar/desfavoritar).
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoritesSignal = signal<FavoriteUniversity[]>(
    this.storage.get<FavoriteUniversity[]>(FAVORITES_KEY, [])
  );

  /** Lista reativa de favoritos, somente leitura para consumidores. */
  readonly favorites = this.favoritesSignal.asReadonly();

  constructor(private storage: StorageService) {}

  isFavorite(university: University): boolean {
    return this.favoritesSignal().some((f) => this.isSame(f, university));
  }

  toggle(university: University): void {
    if (this.isFavorite(university)) {
      this.remove(university);
    } else {
      this.add(university);
    }
  }

  add(university: University): void {
    if (this.isFavorite(university)) return;
    const favorite: FavoriteUniversity = {
      ...university,
      favoritedAt: new Date().toISOString(),
    };
    const updated = [favorite, ...this.favoritesSignal()];
    this.favoritesSignal.set(updated);
    this.persist(updated);
  }

  remove(university: University): void {
    const updated = this.favoritesSignal().filter(
      (f) => !this.isSame(f, university)
    );
    this.favoritesSignal.set(updated);
    this.persist(updated);
  }

  clear(): void {
    this.favoritesSignal.set([]);
    this.persist([]);
  }

  private isSame(a: University, b: University): boolean {
    return a.name === b.name && a.country === b.country;
  }

  private persist(favorites: FavoriteUniversity[]): void {
    this.storage.set(FAVORITES_KEY, favorites);
  }
}
