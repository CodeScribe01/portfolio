import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PROFILE } from '../../data/profile';

@Component({
  selector: 'app-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly profile = PROFILE;
  protected readonly stuck = signal(false);
  protected readonly progress = signal(0);

  /** desktop: the brand mark is the way home, so it isn't repeated */
  protected readonly links = [
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  /** mobile: every page in a bar pinned to the bottom of the screen */
  protected readonly tabs = [
    { path: '/', label: 'Home', icon: 'M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5' },
    { path: '/work', label: 'Work', icon: 'M3 8h18v11H3zM8 8V5h8v3M3 13h18' },
    { path: '/about', label: 'About', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5' },
    { path: '/contact', label: 'Contact', icon: 'M3 5h18v14H3zM3 6l9 7 9-7' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.onScroll();
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    this.progress.set(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    this.stuck.set(window.scrollY > 12);
  }
}
