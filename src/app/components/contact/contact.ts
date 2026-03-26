import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [AsyncPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  readonly portfolio$ = inject(PortfolioService).portfolio$;
}
