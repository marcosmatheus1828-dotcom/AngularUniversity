import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { University } from '../models/university.model';

/**
 * Serviço responsável por consumir a Universities API.
 * Único ponto de acesso HTTP da aplicação.
 */
@Injectable({ providedIn: 'root' })
export class UniversityService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Busca universidades de um país específico.
   * @param country nome do país em inglês, conforme exigido pela API (ex: "Brazil").
   */
  searchByCountry(country: string): Observable<University[]> {
    const params = new HttpParams().set('country', country.trim());
    return this.http.get<University[]>(this.apiUrl, { params });
  }
}
