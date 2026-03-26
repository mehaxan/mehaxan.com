import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches and caches portfolio data from the local JSON asset.
   * To load from your Gist instead, swap the URL to:
   * 'https://gist.githubusercontent.com/mehaxan/1dad6f16f2101e803ab7dfeb4a3a762e/raw/mehaxan.json'
   */
  readonly portfolio$: Observable<Portfolio> = this.http
    .get<Portfolio>('https://gist.githubusercontent.com/mehaxan/1dad6f16f2101e803ab7dfeb4a3a762e/raw/mehaxan.json')
    .pipe(shareReplay(1));
}
