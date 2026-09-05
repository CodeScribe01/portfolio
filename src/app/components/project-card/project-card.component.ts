import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { Project, STATUS_LABEL, STATUS_CLASS } from '../../data/projects';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleryComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  /** full view shows every highlight, the metric strip and the image gallery */
  readonly detailed = input<boolean>(false);

  protected readonly statusLabel = computed(() => STATUS_LABEL[this.project().status]);
  protected readonly statusClass = computed(() => STATUS_CLASS[this.project().status]);
}
