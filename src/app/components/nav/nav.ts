import { Component, HostListener, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface NavLink { label: string; href: string; }

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  readonly themeService = inject(ThemeService);

  readonly links: NavLink[] = [
    { label: 'About',      href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Blog',       href: '#blog' },
    { label: 'Contact',    href: '#contact' },
  ];

  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);

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
