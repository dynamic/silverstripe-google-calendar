<?php

namespace Dynamic\GoogleCalendar\Controller;

use Dynamic\GoogleCalendar\Model\Calendar;
use SilverStripe\View\Requirements;

class CalendarPageController extends \PageController
{
    /**
     * @return void
     */
    protected function init()
    {
        parent::init();

        if ($this->data()->Calendars()->exists()) {
            Requirements::javascript('dynamic/silverstripe-google-calendar:thirdparty/fullcalendar/lib/main.min.js');
            Requirements::javascript('dynamic/silverstripe-google-calendar:client/js/calendar.init.js');
            Requirements::css('dynamic/silverstripe-google-calendar:thirdparty/fullcalendar/lib/main.min.css');
        }
    }

    /**
     * @return false|string
     */
    public function getCalendarIDs()
    {
        $calendarData = [];

        /** @var Calendar $calendar */
        foreach($this->data()->Calendars() as $calendar){
            $calendarData[] = [
                'googleCalendarId' => $calendar->CalendarIDString,
                'className' => $calendar->getMapClassName(),
            ];
        }
        return json_encode($calendarData);
    }
}
