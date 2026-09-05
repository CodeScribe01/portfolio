import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../data/profile';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-cta-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
  templateUrl: './cta-panel.component.html',
  styleUrl: './cta-panel.component.scss',
})
export class CtaPanelComponent {
  protected readonly profile = PROFILE;
}
