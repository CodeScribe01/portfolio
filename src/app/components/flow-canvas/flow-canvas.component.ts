import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  viewChild,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Record_ {
  x: number;
  y: number;
  w: number;
  v: number;
  flagged: boolean;
}

/**
 * Ambient hero background: records drifting through a validation gate.
 * Grey before the gate, accent-blue once validated, amber when flagged —
 * an abstraction of the bulk-ingestion and approval pipelines the site is about.
 */
@Component({
  selector: 'app-flow-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #cv class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>`,
  host: { class: 'pointer-events-none absolute inset-0' },
})
export class FlowCanvasComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private ctx: CanvasRenderingContext2D | null = null;
  private records: Record_[] = [];
  private w = 0;
  private h = 0;
  private frameId = 0;
  private running = false;
  private resizeTimer?: ReturnType<typeof setTimeout>;
  private observer?: IntersectionObserver;

  private static readonly GATE = 0.58;
  private static readonly FLAG_RATE = 0.13;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resize();
    window.addEventListener('resize', this.onResize, { passive: true });

    // only paint while the hero is on screen
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.start();
          else this.stop();
        }
      },
      { threshold: 0 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.stop();
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
    }
    clearTimeout(this.resizeTimer);
  }

  private start(): void {
    if (this.running || !this.ctx) return;
    this.running = true;
    this.frameId = requestAnimationFrame(this.draw);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  private readonly onResize = (): void => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.resize(), 180);
  };

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = this.host.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.w = rect.width;
    this.h = rect.height;
    canvas.width = Math.round(this.w * dpr);
    canvas.height = Math.round(this.h * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.build();
  }

  private build(): void {
    this.records = [];
    const lanes = Math.max(8, Math.min(20, Math.round(this.h / 34)));
    const laneHeight = this.h / lanes;

    for (let lane = 0; lane < lanes; lane++) {
      const perLane = 2 + Math.floor(Math.random() * 2);
      for (let n = 0; n < perLane; n++) {
        this.records.push({
          y: laneHeight * lane + laneHeight * 0.5,
          x: Math.random() * this.w * 1.4 - this.w * 0.2,
          w: 14 + Math.random() * 30,
          v: 0.16 + Math.random() * 0.26,
          flagged: Math.random() < FlowCanvasComponent.FLAG_RATE,
        });
      }
    }
  }

  private readonly draw = (): void => {
    const ctx = this.ctx;
    if (!ctx || !this.running) return;

    ctx.clearRect(0, 0, this.w, this.h);

    const gateX = this.w * FlowCanvasComponent.GATE;
    ctx.strokeStyle = 'rgba(43,75,216,0.16)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(gateX, 0);
    ctx.lineTo(gateX, this.h);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const rec of this.records) {
      rec.x += rec.v;
      if (rec.x > this.w + 60) {
        rec.x = -rec.w - Math.random() * 220;
        rec.flagged = Math.random() < FlowCanvasComponent.FLAG_RATE;
      }

      const fadeRight = Math.min(1, Math.max(0, (this.w - rec.x) / 140));
      const fadeLeft = Math.min(1, Math.max(0, (rec.x + rec.w) / 120));
      const alpha = 0.14 * fadeRight * fadeLeft;
      if (alpha <= 0.002) continue;

      if (rec.x <= gateX) ctx.fillStyle = `rgba(106,113,128,${alpha * 0.6})`;
      else if (rec.flagged) ctx.fillStyle = `rgba(180,83,9,${alpha * 1.25})`;
      else ctx.fillStyle = `rgba(43,75,216,${alpha})`;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rec.x, rec.y - 1.5, rec.w, 3, 1.5);
      } else {
        ctx.rect(rec.x, rec.y - 1.5, rec.w, 3);
      }
      ctx.fill();
    }

    this.frameId = requestAnimationFrame(this.draw);
  };
}
