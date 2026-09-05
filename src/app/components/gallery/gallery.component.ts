import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  PLATFORM_ID,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Shot } from '../../data/projects';

/**
 * Project image gallery: one large view, a thumbnail strip, and a lightbox.
 * Any image that hasn't been added to public/work/ yet falls back to an
 * abstract placeholder, so the layout is identical before and after the real
 * screenshots land.
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly shots = input.required<Shot[]>();
  readonly name = input<string>('');
  /** thumbnails and lightbox are suppressed in the compact (home page) view */
  readonly compact = input<boolean>(false);

  protected readonly active = signal(0);
  protected readonly lightbox = signal(false);
  private readonly failed = signal<ReadonlySet<number>>(new Set<number>());

  protected readonly current = computed(() => this.shots()[this.active()]);
  protected readonly total = computed(() => this.shots().length);
  protected readonly hasMany = computed(() => !this.compact() && this.total() > 1);

  protected isMissing(index: number): boolean {
    return this.failed().has(index);
  }

  protected onError(index: number): void {
    const next = new Set(this.failed());
    next.add(index);
    this.failed.set(next);
  }

  protected select(index: number): void {
    this.active.set(index);
  }

  protected step(delta: number): void {
    const count = this.total();
    if (count < 2) return;
    this.active.set((this.active() + delta + count) % count);
  }

  protected open(): void {
    if (this.compact()) return;
    this.lightbox.set(true);
    this.lockScroll(true);
  }

  protected close(): void {
    this.lightbox.set(false);
    this.lockScroll(false);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent): void {
    if (!this.lightbox()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(-1);
    }
  }

  ngOnDestroy(): void {
    this.lockScroll(false);
  }

  private lockScroll(locked: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
