import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-education',
  imports: [AsyncPipe],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  formatYear(iso: string): string {
    return new Date(iso).getFullYear().toString();
  }
}
