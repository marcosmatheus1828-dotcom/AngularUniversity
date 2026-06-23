import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly techStack = [
    'Angular 17 (Standalone Components)',
    'TypeScript',
    'Angular Material',
    'RxJS',
    'Chart.js / ng2-charts',
    'Local Storage API',
  ];

  readonly features = [
    'Pesquisa de universidades por país via API REST pública',
    'Filtro local por nome, sem nova consulta à API',
    'Sistema de favoritos persistido localmente',
    'Histórico das últimas pesquisas realizadas',
    'Dashboard estatístico com gráfico de resultados',
    'Paginação de resultados e modo escuro/claro',
  ];
}
