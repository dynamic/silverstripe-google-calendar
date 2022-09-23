<?php

namespace Dynamic\GoogleCalendar\Page;

use Dynamic\GoogleCalendar\Controller\CalendarPageController;
use Dynamic\GoogleCalendar\Model\Calendar;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use Symbiote\GridFieldExtensions\GridFieldAddExistingSearchButton;

class CalendarPage extends \Page
{
    /**
     * @var string
     */
    private static $table_name = 'CalendarPage';

    /**
     * @var string
     */
    private static $singular_name = 'Google Calendar Page';

    /**
     * @var string
     */
    private static $plural_name = 'Google Calendar Pages';

    /**
     * @var
     */
    private static $calendar_api_key;

    /**
     * @var string[]
     */
    private static $many_many = [
        'Calendars' => Calendar::class,
    ];

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields) {
            $fields->addFieldToTab(
                'Root.Calendars',
                GridField::create(
                    'Calendars',
                    'Calendars',
                    $this->Calendars(),
                    $config = GridFieldConfig_RelationEditor::create()
                )
            );

            $config->removeComponentsByType([
                GridFieldAddExistingAutocompleter::class,
            ])->addComponents([
                new GridFieldAddExistingSearchButton(),
            ]);
        });

        return parent::getCMSFields();
    }

    /**
     * @return string
     */
    public function getControllerName(): string
    {
        return CalendarPageController::class;
    }

    /**
     * @return mixed
     */
    public function getCalendarAPIKey()
    {
        return $this->config()->get('calendar_api_key');
    }
}
