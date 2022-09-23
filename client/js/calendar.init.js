document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendarIDs = [];



  var calendar = new FullCalendar.Calendar(calendarEl, {
    googleCalendarApiKey: calendarEl.dataset.calendarkey,
    eventSources: JSON.parse(calendarEl.dataset.calendars)
  });

  calendar.render();
});
