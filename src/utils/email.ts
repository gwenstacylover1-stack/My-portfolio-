import { CONTACT_INFO } from '../data/portfolioData';

export const HIRE_ME_EMAIL_SUBJECT = 'New Project Inquiry — S.TARAK AI Labs';

export const HIRE_ME_EMAIL_BODY = [
  'Hi Tarak,',
  '',
  'I just explored S.TARAK AI Labs and would like to discuss a project:',
  '',
  '- Project Type (Website / 3D / AI Assistant / SaaS):',
  '- Target Timeline:',
  '- Estimated Budget:',
  '',
  'Looking forward to connecting!',
].join('\n');

export function isMobileEmailDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export interface SmartEmailLink {
  href: string;
  target?: '_blank';
  rel?: 'noopener noreferrer';
}

export function buildSmartEmailLink(
  subject: string,
  body: string,
  to: string = CONTACT_INFO.email,
): SmartEmailLink {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  if (isMobileEmailDevice()) {
    return {
      href: `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`,
    };
  }

  return {
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodedSubject}&body=${encodedBody}`,
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

export function getHireMeEmailLink(): SmartEmailLink {
  return buildSmartEmailLink(
    HIRE_ME_EMAIL_SUBJECT,
    HIRE_ME_EMAIL_BODY,
    CONTACT_INFO.email,
  );
}
