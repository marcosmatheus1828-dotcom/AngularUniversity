import { Injectable } from '@angular/core';

/**
 * Serviço genérico de acesso ao Local Storage.
 * Centraliza leitura/escrita em JSON e isola o restante
 * da aplicação dos detalhes do `window.localStorage`.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
