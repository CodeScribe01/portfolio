import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CtaPanelComponent } from '../../components/cta-panel/cta-panel.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { PROFILE, SUMMARY } from '../../data/profile';
import { ROLES, EDUCATION } from '../../data/experience';
import { SKILL_GROUPS } from '../../data/skills';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaPanelComponent, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected readonly profile = PROFILE;
  protected readonly summary = SUMMARY;
  protected readonly roles = ROLES;
  protected readonly education = EDUCATION;
  protected readonly groups = SKILL_GROUPS;

  /** falls back to initials until public/me.jpg exists */
  protected readonly noPortrait = signal(false);
}
