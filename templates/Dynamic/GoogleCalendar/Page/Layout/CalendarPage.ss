<div class="container">
    <div class="row">
        <div class="col-md-12 mb-3">
            $Breadcrumbs(20, false, false, true)
            <h1>$Title</h1>
            <% if $Content %><div class="typography mb-4">$Content</div><% end_if %>
            <div id="calendar" data-calendarkey="$CalendarAPIKey" data-calendars="$CalendarIDs"></div>
        </div>
    </div>
</div>

<!-- Event Modal -->
<div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel">Event Title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="eventModalBody">
          Event Description
        </div>
        <div class="modal-footer">
          <a href="#" id="eventModalLink" target="_blank" class="btn btn-primary">Event Link</a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  