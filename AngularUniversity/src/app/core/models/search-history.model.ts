/** Item armazenado no histórico de pesquisas (Local Storage). */
export interface SearchHistoryItem {
  country: string;
  searchedAt: string; // ISO date string
  resultsCount: number;
}
