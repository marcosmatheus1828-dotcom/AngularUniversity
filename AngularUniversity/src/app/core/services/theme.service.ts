import { Injectable, signal } from '@angular/core';

import { StorageService } from './storage.service';

const THEME_KEY = 'au_theme';
const DARK_CLASS = 'dark-theme';

export type ThemeMode = 'light' | 'dark';

/**
 * Controla o tema visual (claro/escuro) da aplicação,
 * persistindo a preferência do usuário em Local Storage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSignal = signal<ThemeMode>(
    this.storage.get<ThemeMode>(THEME_KEY, 'light')
  );

  readonly theme = this.themeSignal.asReadonly();

  constructor(private storage: StorageService) {
    this.applyToDom(this.themeSignal());
  }

  toggle(): void {
    const next: ThemeMode = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.themeSignal.set(next);
    this.storage.set(THEME_KEY, next);
    this.applyToDom(next);
  }

  private applyToDom(mode: ThemeMode): void {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }
  }
}
