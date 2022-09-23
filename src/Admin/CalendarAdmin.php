<?php

namespace Dynamic\GoogleCalendar\Admin;

use Dynamic\GoogleCalendar\Model\Calendar;
use SilverStripe\Admin\ModelAdmin;

class CalendarAdmin extends ModelAdmin
{
    /**
     * @var array
     */
    private static $managed_models = [
        Calendar::class => [
            'title' => 'Calendars',
        ],
    ];

    /**
     * @var string
     */
    private static $url_segment = 'calendars';

    /**
     * @var string
     */
    private static $menu_title = 'Calendars';
}
