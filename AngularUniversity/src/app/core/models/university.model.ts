/**
 * Representa uma universidade conforme retornado pela
 * Universities API (http://universities.hipolabs.com).
 */
export interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  domains: string[];
  web_pages: string[];
  state_province: string | null;
}

/**
 * Universidade marcada como favorita, com metadados extras
 * para exibição na tela de Favoritos.
 */
export interface FavoriteUniversity extends University {
  favoritedAt: string; // ISO date string
}

/** Critérios de ordenação suportados na tela de resultados. */
export type SortOrder = 'asc' | 'desc' | 'none';
