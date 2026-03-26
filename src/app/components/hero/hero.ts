import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PersonalInfo } from '../../models/portfolio.model';
import { Subscription } from 'rxjs';

const TYPEWRITER_PHRASES = [
  'Senior Software Engineer',
  'Angular Architect',
  'Full-Stack Developer',
  'UI / UX Enthusiast',
  'DevOps Practitioner',
  'Side Project Builder',
];

const TECH_PILLS = ['Angular', 'TypeScript', 'RxJS', 'Node.js', 'React', 'Docker', 'Azure', 'NgRx'];

@Component({
  selector: 'app-hero',
  imports: [AsyncPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  private readonly svc = inject(PortfolioService);
  readonly portfolio$ = this.svc.portfolio$;
  readonly pills = TECH_PILLS;

  readonly typewriterText = signal('');
  readonly showCursor = signal(true);

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private cursorTimer: ReturnType<typeof setInterval> | null = null;
  private sub?: Subscription;

  ngOnInit(): void {
    this.tick();
    this.cursorTimer = setInterval(() => this.showCursor.update(v => !v), 530);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.cursorTimer) clearInterval(this.cursorTimer);
    this.sub?.unsubscribe();
  }

  private tick(): void {
    const phrase = TYPEWRITER_PHRASES[this.phraseIndex];
    if (this.isDeleting) {
      this.typewriterText.set(phrase.slice(0, --this.charIndex));
    } else {
      this.typewriterText.set(phrase.slice(0, ++this.charIndex));
    }
    let delay = this.isDeleting ? 50 : 80;
    if (!this.isDeleting && this.charIndex === phrase.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % TYPEWRITER_PHRASES.length;
      delay = 400;
    }
    this.timer = setTimeout(() => this.tick(), delay);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
