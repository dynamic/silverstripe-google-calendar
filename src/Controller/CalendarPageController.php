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
            Requirements::css('dynamic/silverstripe-google-calendar:client/dist/styles/bundle.css');
            Requirements::javascript('dynamic/silverstripe-google-calendar:client/dist/js/bundle.js');
        }
    }

    /**
     * @return false|string
     */
    public function getCalendarIDs()
    {
        $calendarData = [];

        /** @var Calendar $calendar */
        foreach ($this->data()->Calendars() as $calendar) {
            $calendarData[] = [
                'googleCalendarId' => $calendar->CalendarIDString,
                'className' => $calendar->getMapClassName(),
            ];
        }
        return json_encode($calendarData);
    }
}
