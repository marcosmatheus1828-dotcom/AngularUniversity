import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formata uma data ISO em formato amigável pt-BR: dd/mm/aaaa às hh:mm.
 * Usado no histórico de pesquisas e na lista de favoritos.
 */
@Pipe({
  name: 'auDate',
  standalone: true,
})
export class AuDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '-';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }
}
