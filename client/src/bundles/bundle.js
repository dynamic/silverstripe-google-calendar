// Include FullCalendar and Bootstrap5
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

  const calendar = new Calendar(calendarEl, {
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
  });

  calendar.render();
});
