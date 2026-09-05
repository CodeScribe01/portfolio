import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TECH_ROW } from '../../data/tech-stack';
import { RevealDirective } from '../../directives/reveal.directive';

/** A plain row of what I build with — scannable at a glance, nothing to interpret. */
@Component({
  selector: 'app-tech-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './tech-row.component.html',
  styleUrl: './tech-row.component.scss',
})
export class TechRowComponent {
  protected readonly tech = TECH_ROW;
}
