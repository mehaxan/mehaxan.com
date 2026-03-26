import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-blog',
  imports: [AsyncPipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
  }
}
