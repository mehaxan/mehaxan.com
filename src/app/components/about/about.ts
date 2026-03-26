import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  readonly stats = [
    { value: '6+', label: 'Years Experience' },
    { value: '2',  label: 'Companies' },
    { value: '∞',  label: 'Side Projects' },
    { value: '↑',  label: 'Always Growing' },
  ];
}
