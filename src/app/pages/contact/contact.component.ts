import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';
import { PROFILE, GOOGLE_FORM } from '../../data/profile';

interface Channel {
  key: string;
  value: string;
  href: string;
  external: boolean;
  note: string;
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly profile = PROFILE;

  protected readonly channels: Channel[] = [
    {
      key: 'Email',
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      external: false,
      note: 'Fastest — usually a same-day reply',
    },
    {
      key: 'LinkedIn',
      value: PROFILE.linkedinHandle,
      href: PROFILE.linkedin,
      external: true,
      note: 'Best for recruiters',
    },
    {
      key: 'GitHub',
      value: PROFILE.githubHandle,
      href: PROFILE.github,
      external: true,
      note: 'Personal projects and experiments',
    },
    {
      key: 'Résumé',
      value: 'cv.pdf',
      href: PROFILE.cv,
      external: true,
      note: 'Full detail, one page',
    },
  ];

  // --- form state ---
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  /** honeypot — bots fill hidden fields, people don't */
  protected readonly botcheck = signal('');

  protected readonly state = signal<SendState>('idle');
  protected readonly errorText = signal('');
  protected readonly touched = signal(false);

  private static readonly EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  protected readonly nameError = computed(() =>
    this.touched() && this.name().trim().length < 2 ? 'Please enter your name.' : ''
  );

  protected readonly emailError = computed(() => {
    if (!this.touched()) return '';
    const value = this.email().trim();
    if (!value) return 'Please enter your email so I can reply.';
    return ContactComponent.EMAIL_RE.test(value) ? '' : 'That email address doesn\u2019t look right.';
  });

  protected readonly messageError = computed(() =>
    this.touched() && this.message().trim().length < 10
      ? 'A sentence or two is enough — tell me what you need.'
      : ''
  );

  protected readonly valid = computed(
    () =>
      this.name().trim().length >= 2 &&
      ContactComponent.EMAIL_RE.test(this.email().trim()) &&
      this.message().trim().length >= 10
  );

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    this.touched.set(true);

    if (!this.valid() || this.state() === 'sending') return;
    if (this.botcheck()) return; // silently drop bots

    // Not wired to a Google Form yet — hand the message to the visitor's mail
    // client so the form still does something useful.
    if (!GOOGLE_FORM.formId) {
      this.openMailClient();
      return;
    }

    this.state.set('sending');
    this.errorText.set('');

    const body = new FormData();
    body.append(GOOGLE_FORM.fields.name, this.name().trim());
    body.append(GOOGLE_FORM.fields.email, this.email().trim());
    body.append(GOOGLE_FORM.fields.message, this.message().trim());

    try {
      // Google Forms sends no CORS headers, so the response is opaque: a
      // resolved fetch means the POST was delivered, which is all we can check.
      await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM.formId}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });

      this.state.set('sent');
      this.name.set('');
      this.email.set('');
      this.message.set('');
      this.touched.set(false);
    } catch {
      this.fail('Could not reach Google Forms — check your connection.');
    }
  }

  private fail(reason: string): void {
    this.state.set('error');
    this.errorText.set(reason);
  }

  protected reset(): void {
    this.state.set('idle');
    this.errorText.set('');
  }

  /** fallback path: pre-fill the visitor's mail client */
  protected openMailClient(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const subject = encodeURIComponent(`Portfolio message from ${this.name().trim()}`);
    const body = encodeURIComponent(`${this.message().trim()}\n\n— ${this.name().trim()}\n${this.email().trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }
}
