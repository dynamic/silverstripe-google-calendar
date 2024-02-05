<?php

namespace Dynamic\GoogleCalendar\Tests\Page;

use Dynamic\GoogleCalendar\Page\CalendarPage;
use SilverStripe\Forms\FieldList;
use SilverStripe\Dev\SapphireTest;

class CalendarPageTest extends SapphireTest
{
    /**
     * @var string
     */
    protected static $fixture_file = 'calendar-page-test.yml';

    /**
     *
     */
    public function testGetCMSFields()
    {
        $object = $this->objFromFixture(CalendarPage::class, 'default');
        $fields = $object->getCMSFields();
        $this->assertInstanceOf(FieldList::class, $fields);
    }
}
