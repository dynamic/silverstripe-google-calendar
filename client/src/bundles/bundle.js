import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Modal } from 'bootstrap'; // Make sure to import the Modal

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

  const calendar = new Calendar(calendarEl, {
    // Your calendar options
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin, bootstrap5Plugin],
    themeSystem: 'standard',
    googleCalendarApiKey: calendarEl.dataset.calendarkey,
    eventSources: JSON.parse(calendarEl.dataset.calendars),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: (clickInfo) => {
      // Format the date and time as desired. Example: 'Monday, January 1, 2020 12:00 AM'
      const eventStart = new Date(clickInfo.event.start).toLocaleString();
      const eventEnd = clickInfo.event.end ? new Date(clickInfo.event.end).toLocaleString() : 'No end time';

      document.getElementById('eventModalLabel').textContent = clickInfo.event.title;
      document.getElementById('eventModalBody').innerHTML = `
        <p>${clickInfo.event.extendedProps.description || 'No description available'}</p>
        <p><strong>Start:</strong> ${eventStart}</p>
        <p><strong>End:</strong> ${eventEnd}</p>
      `;
      document.getElementById('eventModalLink').setAttribute('href', clickInfo.event.url || '#');
      document.getElementById('eventModalLink').textContent = 'Event Link';

      clickInfo.jsEvent.preventDefault(); // Prevent the default action
      const eventModal = new Modal(document.getElementById('eventModal')); // Show the modal
      eventModal.show();
    }
  });

  calendar.render();
});
