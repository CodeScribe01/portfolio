import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CtaPanelComponent } from '../../components/cta-panel/cta-panel.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { PROJECTS } from '../../data/projects';

type Filter = 'all' | 'client' | 'personal';

@Component({
  selector: 'app-work',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent, CtaPanelComponent, RevealDirective],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  protected readonly filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Everything' },
    { key: 'client', label: 'Client work' },
    { key: 'personal', label: 'Personal projects' },
  ];

  protected readonly active = signal<Filter>('all');

  protected readonly projects = computed(() => {
    const filter = this.active();
    if (filter === 'all') return PROJECTS;
    if (filter === 'personal') return PROJECTS.filter((p) => p.status === 'personal');
    return PROJECTS.filter((p) => p.status !== 'personal');
  });

  protected readonly counts = {
    all: PROJECTS.length,
    client: PROJECTS.filter((p) => p.status !== 'personal').length,
    personal: PROJECTS.filter((p) => p.status === 'personal').length,
  };

  protected select(filter: Filter): void {
    this.active.set(filter);
  }
}
