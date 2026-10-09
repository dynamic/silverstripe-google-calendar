/* global jest, describe, it, expect, beforeEach */
import { descriptionText, formatRange, populateModal, createEventClickHandler } from '../js/eventModal';

const MODAL_HTML = `
  <div id="eventModal" data-no-description="No description available" data-label-start="Start:" data-label-end="End:">
    <h5 id="eventModalLabel"></h5>
    <div id="eventModalBody"></div>
    <a id="eventModalLink" href="#" hidden></a>
  </div>`;

const makeEvent = (overrides = {}) => ({
  title: 'Planning',
  allDay: false,
  start: new Date(2026, 9, 12, 9, 0),
  end: new Date(2026, 9, 12, 10, 30),
  url: 'https://calendar.google.com/event?eid=abc',
  extendedProps: { description: '' },
  ...overrides,
});

describe('descriptionText', () => {
  it('returns plain text unchanged', () => {
    expect(descriptionText('Bring a laptop')).toBe('Bring a laptop');
  });

  it('keeps line breaks from <br> and block closers', () => {
    expect(descriptionText('One<br>Two<p>Three</p>Four')).toBe('One\nTwo\nThree\nFour');
  });

  it('uses single line breaks between paragraphs and bullets list items', () => {
    expect(descriptionText('<p>A</p><p>B</p>')).toBe('A\nB');
    expect(descriptionText('<ul><li>x</li><li>y</li></ul>')).toBe('\u2022 x\n\u2022 y');
  });

  it('treats a description of only non-breaking spaces as empty', () => {
    expect(descriptionText('&nbsp;')).toBe('');
  });

  it('drops markup instead of rendering it', () => {
    expect(descriptionText('<a href="https://example.com">Agenda</a>')).toBe('Agenda');
  });

  it('returns an empty string for empty input', () => {
    expect(descriptionText(undefined)).toBe('');
  });
});

describe('formatRange', () => {
  it('shows a single date for a one-day all-day event', () => {
    const { start, end } = formatRange(makeEvent({
      allDay: true,
      start: new Date(2026, 9, 12),
      end: new Date(2026, 9, 13),
    }), 'en-US');
    expect(start).toContain('October 12, 2026');
    expect(start).not.toMatch(/AM|PM|:/);
    expect(end).toBeNull();
  });

  it('ends a multi-day all-day event on the day before the exclusive end', () => {
    const { start, end } = formatRange(makeEvent({
      allDay: true,
      start: new Date(2026, 9, 12),
      end: new Date(2026, 9, 15),
    }), 'en-US');
    expect(start).toContain('October 12, 2026');
    expect(end).toContain('October 14, 2026');
  });

  it('shows the date once and a time-only end for a same-day timed event', () => {
    const { start, end } = formatRange(makeEvent(), 'en-US');
    expect(start).toMatch(/October 12, 2026.*9:00/);
    expect(end).toMatch(/10:30/);
    expect(end).not.toMatch(/2026/);
  });

  it('shows the full end for a timed event that crosses midnight', () => {
    const { end } = formatRange(makeEvent({ end: new Date(2026, 9, 13, 1, 0) }), 'en-US');
    expect(end).toMatch(/October 13, 2026.*1:00/);
  });

  it('has no end when it equals the start', () => {
    expect(formatRange(makeEvent({ end: new Date(2026, 9, 12, 9, 0) }), 'en-US').end).toBeNull();
  });

  it('has no end for a timed event without one', () => {
    expect(formatRange(makeEvent({ end: null })).end).toBeNull();
  });
});

describe('populateModal', () => {
  let modalEl;

  beforeEach(() => {
    document.body.innerHTML = MODAL_HTML;
    modalEl = document.getElementById('eventModal');
  });

  it('renders a hostile description as text, never as elements', () => {
    populateModal(modalEl, makeEvent({
      title: '<b>Title</b>',
      extendedProps: { description: '<img src=x onerror="window.pwned=1">Hello' },
    }));
    const body = document.getElementById('eventModalBody');
    expect(body.querySelector('img')).toBeNull();
    expect(body.querySelector('.event-modal__description').textContent).toBe('Hello');
    expect(document.getElementById('eventModalLabel').textContent).toBe('<b>Title</b>');
    expect(window.pwned).toBeUndefined();
  });

  it('falls back to the localised no-description string', () => {
    populateModal(modalEl, makeEvent());
    expect(document.querySelector('.event-modal__description').textContent).toBe('No description available');
  });

  it('omits the End line when there is no distinct end', () => {
    populateModal(modalEl, makeEvent({ end: null }));
    expect(document.getElementById('eventModalBody').querySelectorAll('p')).toHaveLength(2);
  });

  it('shows the link only when the event has a URL', () => {
    const link = document.getElementById('eventModalLink');
    populateModal(modalEl, makeEvent());
    expect(link.hidden).toBe(false);
    expect(link.getAttribute('href')).toBe('https://calendar.google.com/event?eid=abc');

    populateModal(modalEl, makeEvent({ url: '' }));
    expect(link.hidden).toBe(true);
    expect(link.hasAttribute('href')).toBe(false);
  });

  it('hides the link for the "null" string FullCalendar produces and for non-http schemes', () => {
    const link = document.getElementById('eventModalLink');
    ['null', `${'java'}script:alert(1)`].forEach((url) => {
      populateModal(modalEl, makeEvent({ url }));
      expect(link.hidden).toBe(true);
      expect(link.hasAttribute('href')).toBe(false);
    });
  });
});

describe('createEventClickHandler', () => {
  it('leaves the default link-out alone when the modal markup is absent', () => {
    document.body.innerHTML = '';
    const Modal = { getOrCreateInstance: jest.fn() };
    const jsEvent = { preventDefault: jest.fn() };

    createEventClickHandler(Modal)({ event: makeEvent(), jsEvent });

    expect(jsEvent.preventDefault).not.toHaveBeenCalled();
    expect(Modal.getOrCreateInstance).not.toHaveBeenCalled();
  });

  it('moves the modal to the body so layout wrappers cannot clip it', () => {
    document.body.innerHTML = `<div id="wrapper">${MODAL_HTML}</div>`;
    const Modal = { getOrCreateInstance: jest.fn(() => ({ show: jest.fn() })) };

    createEventClickHandler(Modal)({ event: makeEvent(), jsEvent: { preventDefault: jest.fn() } });

    expect(document.getElementById('eventModal').parentElement).toBe(document.body);
  });

  it('prevents navigation and reuses the modal instance on every click', () => {
    document.body.innerHTML = MODAL_HTML;
    const show = jest.fn();
    const Modal = { getOrCreateInstance: jest.fn(() => ({ show })) };
    const handler = createEventClickHandler(Modal);
    const jsEvent = { preventDefault: jest.fn() };

    handler({ event: makeEvent(), jsEvent });
    handler({ event: makeEvent(), jsEvent });

    expect(jsEvent.preventDefault).toHaveBeenCalledTimes(2);
    expect(Modal.getOrCreateInstance).toHaveBeenCalledWith(document.getElementById('eventModal'));
    expect(show).toHaveBeenCalledTimes(2);
  });
});
