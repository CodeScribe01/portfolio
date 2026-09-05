import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Counts a number up once it scrolls into view. Static text is left alone. */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private frameId = 0;

  /** target value; when undefined the element renders its content unchanged */
  readonly appCountUp = input<number | undefined>(undefined);
  readonly suffix = input<string>('');
  readonly duration = input<number>(1000);

  ngAfterViewInit(): void {
    const target = this.appCountUp();
    if (!isPlatformBrowser(this.platformId) || target === undefined) return;

    const node = this.el.nativeElement;
    const decimals = Number.isInteger(target) ? 0 : 1;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = target.toFixed(decimals) + this.suffix();
      return;
    }

    node.textContent = (0).toFixed(decimals) + this.suffix();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.observer?.unobserve(entry.target);
          this.run(node, target, decimals);
        }
      },
      { threshold: 0.6 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frameId);
  }

  private run(node: HTMLElement, target: number, decimals: number): void {
    const total = this.duration();
    const suffix = this.suffix();
    let start: number | null = null;

    const step = (now: number): void => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) this.frameId = requestAnimationFrame(step);
    };

    this.frameId = requestAnimationFrame(step);
  }
}
