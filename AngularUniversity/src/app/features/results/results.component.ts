import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { UniversityCardComponent } from '../../shared/components/university-card/university-card.component';
import { UniversityService } from '../../core/services/university.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { SearchHistoryService } from '../../core/services/search-history.service';
import { SortOrder, University } from '../../core/models/university.model';

const PAGE_SIZE_OPTIONS = [9, 18, 36];

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    FormsModule,
    SearchBarComponent,
    UniversityCardComponent,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  country = '';
  filterText = '';
  sortOrder: SortOrder = 'none';

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  pageIndex = 0;
  pageSize = PAGE_SIZE_OPTIONS[0];

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  results = signal<University[]>([]);

  /** Resultados após aplicar o filtro local por nome (sem nova chamada à API). */
  filtered = computed(() => {
    const term = this.filterText.trim().toLowerCase();
    const base = this.results();
    return term ? base.filter((u) => u.name.toLowerCase().includes(term)) : base;
  });

  /** Resultados filtrados + ordenados. */
  sorted = computed(() => {
    const list = [...this.filtered()];
    if (this.sortOrder === 'asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOrder === 'desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  });

  /** Página atual a ser exibida. */
  paged = computed(() => {
    const start = this.pageIndex * this.pageSize;
    return this.sorted().slice(start, start + this.pageSize);
  });

  /** Quantidade de domínios institucionais únicos (dashboard). */
  uniqueDomainsCount = computed(() => {
    const domains = new Set<string>();
    for (const u of this.results()) {
      u.domains?.forEach((d) => domains.add(d));
    }
    return domains.size;
  });

  favoritesInResultsCount = computed(
    () =>
      this.results().filter((u) => this.favoritesService.isFavorite(u)).length
  );

  chartData = computed<ChartData<'bar'>>(() => ({
    labels: [this.country || 'País pesquisado'],
    datasets: [
      {
        label: 'Universidades retornadas',
        data: [this.results().length],
        backgroundColor: '#3454d1',
        borderRadius: 6,
      },
    ],
  }));

  readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService,
    public favoritesService: FavoritesService,
    private historyService: SearchHistoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const country = params['country'];
      if (country) {
        this.country = country;
        this.search(country);
      }
    });
  }

  onSearchTriggered(country: string): void {
    this.router.navigate(['/resultados'], { queryParams: { country } });
  }

  search(country: string): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.filterText = '';
    this.pageIndex = 0;

    this.universityService.searchByCountry(country).subscribe({
      next: (data) => {
        this.results.set(data);
        this.historyService.add(country, data.length);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.errorMessage.set(
          'Não foi possível buscar universidades agora. Verifique sua conexão e tente novamente.'
        );
        this.loading.set(false);
      },
    });
  }

  onFilterChange(value: string): void {
    this.filterText = value;
    this.pageIndex = 0;
  }

  setSortOrder(order: SortOrder): void {
    this.sortOrder = order;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onToggleFavorite(university: University): void {
    this.favoritesService.toggle(university);
  }
}
