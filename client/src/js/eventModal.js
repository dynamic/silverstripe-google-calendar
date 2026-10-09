/**
 * Reduce a Google Calendar description (which may contain HTML) to plain text,
 * keeping line breaks. The markup is parsed in an inert document, so nothing in
 * it is fetched or executed.
 *
 * @param {string} html
 * @returns {string}
 */
export const descriptionText = (html) => {
  if (!html) {
    return '';
  }
  const withBreaks = String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '\n\u2022 ')
    .replace(/<\/?(p|div|li|ul|ol)\b[^>]*>/gi, '\n');
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
  return (doc.body.textContent || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
};

/**
 * Format an event's start and end for display. FullCalendar's `end` is
 * exclusive for all-day events, so the last day shown is the day before it.
 *
 * @param {object} event FullCalendar event
 * @param {string} [locale] BCP 47 tag; defaults to the browser locale
 * @returns {{start: string, end: (string|null)}}
 */
export const formatRange = (event, locale) => {
  if (event.allDay) {
    const opts = { dateStyle: 'full' };
    const start = event.start.toLocaleDateString(locale, opts);
    if (!event.end) {
      return { start, end: null };
    }
    const lastDay = new Date(event.end.getTime());
    lastDay.setDate(lastDay.getDate() - 1);
    const end = lastDay.toLocaleDateString(locale, opts);
    return { start, end: end === start ? null : end };
  }

  const opts = { dateStyle: 'full', timeStyle: 'short' };
  const start = event.start.toLocaleString(locale, opts);
  if (!event.end || event.end.getTime() === event.start.getTime()) {
    return { start, end: null };
  }
  const sameDay = event.start.toDateString() === event.end.toDateString();
  return {
    start,
    end: sameDay
      ? event.end.toLocaleTimeString(locale, { timeStyle: 'short' })
      : event.end.toLocaleString(locale, opts),
  };
};

/**
 * Only absolute http(s) URLs become a link. FullCalendar coerces a missing
 * `htmlLink` to the string "null", so a truthiness check is not enough.
 *
 * @param {*} url
 * @returns {string|null}
 */
const linkUrl = (url) => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:' ? url : null;
  } catch (e) {
    return null;
  }
};

const paragraph = (text, className) => {
  const p = document.createElement('p');
  p.textContent = text;
  if (className) {
    p.className = className;
  }
  return p;
};

/**
 * Fill the modal markup rendered by CalendarPage.ss. Every value goes in via
 * textContent; nothing from the calendar is treated as HTML.
 *
 * @param {HTMLElement} modalEl
 * @param {object} event FullCalendar event
 * @param {string} [locale] BCP 47 tag passed to formatRange
 */
export const populateModal = (modalEl, event, locale) => {
  const { noDescription, labelStart, labelEnd } = modalEl.dataset;
  const { start, end } = formatRange(event, locale);
  const description = descriptionText(event.extendedProps.description) || noDescription || '';

  modalEl.querySelector('#eventModalLabel').textContent = event.title;

  const body = [
    paragraph(description, 'event-modal__description'),
    paragraph(`${labelStart} ${start}`),
  ];
  if (end) {
    body.push(paragraph(`${labelEnd} ${end}`));
  }
  modalEl.querySelector('#eventModalBody').replaceChildren(...body);

  const link = modalEl.querySelector('#eventModalLink');
  const href = linkUrl(event.url);
  link.hidden = !href;
  if (href) {
    link.href = href;
  } else {
    link.removeAttribute('href');
  }
};

/**
 * @param {{getOrCreateInstance: Function}} Modal Bootstrap 5 Modal class
 * @returns {Function} FullCalendar eventClick handler
 */
export const createEventClickHandler = (Modal) => ({ event, jsEvent }) => {
  const modalEl = document.getElementById('eventModal');
  if (!modalEl) {
    // Template override without the modal markup: keep FullCalendar's default link-out.
    return;
  }
  jsEvent.preventDefault();
  if (modalEl.parentElement !== document.body) {
    // A fixed-position modal must not sit inside a transformed or clipped layout wrapper.
    document.body.appendChild(modalEl);
  }
  populateModal(modalEl, event);
  Modal.getOrCreateInstance(modalEl).show();
};
