import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience as ExperienceModel } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience',
  imports: [AsyncPipe],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  duration(start: string, end: string | null): string {
    const from = new Date(start);
    const to = end ? new Date(end) : new Date();
    const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years}y`);
    if (remainingMonths > 0) parts.push(`${remainingMonths}m`);
    return parts.join(' ') || '< 1m';
  }

  isCurrentRole(exp: ExperienceModel): boolean {
    return exp.endDate === null;
  }
}
