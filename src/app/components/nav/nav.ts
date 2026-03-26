import { Component, HostListener, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface NavLink { label: string; href: string; }

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);

  readonly links: NavLink[] = [
    { label: 'About',      href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Contact',    href: '#contact' },
  ];

  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);
  readonly activeSection = signal<string>('');

  #observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.#observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    // Observe all sections with an id
    document.querySelectorAll('section[id]').forEach(section => {
      this.#observer!.observe(section);
    });
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.mobileOpen.set(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

