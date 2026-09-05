import {
  Component,
  ChangeDetectionStrategy,
  signal,
  AfterViewInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlowCanvasComponent } from '../../components/flow-canvas/flow-canvas.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CtaPanelComponent } from '../../components/cta-panel/cta-panel.component';
import { TechRowComponent } from '../../components/tech-row/tech-row.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { PROFILE, SUMMARY, STATS } from '../../data/profile';
import { FEATURED } from '../../data/projects';
import { ROLES } from '../../data/experience';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    FlowCanvasComponent,
    ProjectCardComponent,
    CtaPanelComponent,
    TechRowComponent,
    RevealDirective,
    CountUpDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly profile = PROFILE;
  protected readonly summary = SUMMARY;
  protected readonly stats = STATS;
  protected readonly featured = FEATURED;
  protected readonly currentRole = ROLES[0];

  /** headline words rise in sequence once the component paints */
  protected readonly headline = ['Systems', 'that', 'move', 'real', 'work', 'through.'];
  protected readonly accentFrom = 3;
  protected readonly lit = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.lit.set(true);
      return;
    }
    requestAnimationFrame(() => setTimeout(() => this.lit.set(true), 90));
  }
}
