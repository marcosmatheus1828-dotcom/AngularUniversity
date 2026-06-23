import { Injectable, signal } from '@angular/core';

import { SearchHistoryItem } from '../models/search-history.model';
import { StorageService } from './storage.service';

const HISTORY_KEY = 'au_search_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Mantém o histórico dos últimos países pesquisados,
 * persistido em Local Storage.
 */
@Injectable({ providedIn: 'root' })
export class SearchHistoryService {
  private readonly historySignal = signal<SearchHistoryItem[]>(
    this.storage.get<SearchHistoryItem[]>(HISTORY_KEY, [])
  );

  readonly history = this.historySignal.asReadonly();

  constructor(private storage: StorageService) {}

  add(country: string, resultsCount: number): void {
    const item: SearchHistoryItem = {
      country,
      resultsCount,
      searchedAt: new Date().toISOString(),
    };
    const updated = [item, ...this.historySignal()].slice(
      0,
      MAX_HISTORY_ITEMS
    );
    this.historySignal.set(updated);
    this.storage.set(HISTORY_KEY, updated);
  }

  clear(): void {
    this.historySignal.set([]);
    this.storage.set(HISTORY_KEY, []);
  }
}
