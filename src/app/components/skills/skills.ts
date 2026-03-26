import { Component, inject, signal, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [AsyncPipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements AfterViewInit, OnDestroy {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  /** CSS gradient per category index for the top stripe */
  readonly categoryColors: string[] = [
    'linear-gradient(90deg, #00e5ff, #0099cc)',
    'linear-gradient(90deg, #b86eff, #7c3aed)',
    'linear-gradient(90deg, #10b981, #059669)',
    'linear-gradient(90deg, #f59e0b, #d97706)',
    'linear-gradient(90deg, #f43f5e, #e11d48)',
    'linear-gradient(90deg, #00e5ff, #b86eff)',
  ];

  readonly visibleCards = signal<Set<number>>(new Set());

  @ViewChildren('skillCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  #observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.#observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset['idx']);
            this.visibleCards.update(s => new Set([...s, idx]));
          }
        });
      },
      { threshold: 0.15 }
    );
    this.cardRefs.forEach(ref => this.#observer!.observe(ref.nativeElement));
    this.cardRefs.changes.subscribe(() => {
      this.cardRefs.forEach(ref => this.#observer!.observe(ref.nativeElement));
    });
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
  }

  colorFor(index: number): string {
    return this.categoryColors[index % this.categoryColors.length];
  }

  isVisible(index: number): boolean {
    return this.visibleCards().has(index);
  }
}

