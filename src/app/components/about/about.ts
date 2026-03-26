import { Component, inject, signal, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {
  readonly portfolio$ = inject(PortfolioService).portfolio$;

  readonly stats = [
    { value: '6+', label: 'Years Experience' },
    { value: '2',  label: 'Companies' },
    { value: '∞',  label: 'Side Projects' },
    { value: '↑',  label: 'Always Growing' },
  ];

  /** Whether stats grid has entered the viewport */
  readonly statsInView = signal(false);

  @ViewChild('statsGrid') statsGridRef!: ElementRef<HTMLElement>;

  #statsObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    // Stats observer is set up after view init via AfterViewInit-style hack;
    // We defer it so the ViewChild ref is ready.
    setTimeout(() => this.#initStatsObserver(), 0);
  }

  #initStatsObserver(): void {
    if (!this.statsGridRef) return;
    this.#statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.statsInView.set(true);
          this.#statsObserver?.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    this.#statsObserver.observe(this.statsGridRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.#statsObserver?.disconnect();
  }

  /** Apply a 3-D tilt effect to the avatar based on cursor position */
  onAvatarTilt(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (event.clientX - cx) / (rect.width / 2);   // -1 to +1
    const dy = (event.clientY - cy) / (rect.height / 2);   // -1 to +1
    const maxDeg = 14;
    target.style.setProperty('--tilt-rx', `${(-dy * maxDeg).toFixed(1)}deg`);
    target.style.setProperty('--tilt-ry', `${(dx * maxDeg).toFixed(1)}deg`);
  }

  /** Reset tilt on mouse leave */
  onAvatarReset(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.style.setProperty('--tilt-rx', '0deg');
    target.style.setProperty('--tilt-ry', '0deg');
  }
}

