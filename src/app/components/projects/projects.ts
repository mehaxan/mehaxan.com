import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  imports: [AsyncPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  readonly portfolio$ = inject(PortfolioService).portfolio$;
}
