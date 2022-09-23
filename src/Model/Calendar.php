<?php

namespace Dynamic\GoogleCalendar\Model;

use Dynamic\GoogleCalendar\Page\CalendarPage;
use SilverStripe\ORM\DataObject;

class Calendar extends DataObject
{
    /**
     * @var string
     */
    private static $table_name = 'Calendar';

    /**
     * @var string[]
     */
    private static $db = [
        'Title' => 'Varchar',
        'CalendarIDString' => 'Varchar(255)',
    ];

    /**
     * @var string[]
     */
    private static $belongs_many_many = [
        'CalendarPages' => CalendarPage::class,
    ];

    /**
     * @var array[]
     */
    private static $indexes = [
        'calendar-id-index' => [
            'type' => 'unique',
            'columns' => ['CalendarIDString'],
        ],
    ];

    /**
     * @return string
     */
    public function getMapClassName(): string
    {
        return strtolower(str_replace(' ', '-', $this->Title));
    }
}
