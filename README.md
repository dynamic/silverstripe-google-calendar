# Silverstripe Google Calendar Module

A calendar module that integrates with Google Calendar, displaying events on the frontend seamlessly.

[![CI](https://github.com/dynamic/silverstripe-google-calendar/actions/workflows/ci.yml/badge.svg)](https://github.com/dynamic/silverstripe-google-calendar/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/dynamic/silverstripe-google-calendar/branch/master/graph/badge.svg)](https://codecov.io/gh/dynamic/silverstripe-google-calendar)

[![Latest Stable Version](https://poser.pugx.org/dynamic/silverstripe-google-calendar/v/stable)](https://packagist.org/packages/dynamic/silverstripe-google-calendar)
[![Total Downloads](https://poser.pugx.org/dynamic/silverstripe-google-calendar/downloads)](https://packagist.org/packages/dynamic/silverstripe-google-calendar)
[![Latest Unstable Version](https://poser.pugx.org/dynamic/silverstripe-google-calendar/v/unstable)](https://packagist.org/packages/dynamic/silverstripe-google-calendar)
[![License](https://poser.pugx.org/dynamic/silverstripe-google-calendar/license)](https://packagist.org/packages/dynamic/silverstripe-google-calendar)

## Requirements

* silverstripe/cms ^5
* symbiote/silverstripe-gridfieldextensions ^4

## Installation

`composer require dynamic/silverstripe-google-calendar`

## License

See [License](LICENSE.md)

## Example usage

### Google API Keys

You'll  need to create a [Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the Google Calendar API library enabled.

In `mysite.yml`:

```yaml
Dynamic\GoogleCalendar\Page\CalendarPage:
  calendar_api_key: 'your-key-here'
```

### CMS

In the CMS, create a Google Calendar Page. Navigate to the Calendars tab. Here you can add one or more calendars to display. 

To add a calendar, give it a title, and paste in the Google Calendar ID (from the calendar settings).

## Maintainers

 *  [Dynamic](https://www.dynamicagency.com) (<dev@dynamicagency.com>)
 
## Bugtracker
Bugs are tracked in the issues section of this repository. Before submitting an issue please read over 
existing issues to ensure yours is unique. 
 
If the issue does look like a new bug:
 
 - Create a new issue
 - Describe the steps required to reproduce your issue, and the expected outcome. Unit tests, screenshots 
 and screencasts can help here.
 - Describe your environment as detailed as possible: SilverStripe version, Browser, PHP version, 
 Operating System, any installed SilverStripe modules.
 
Please report security issues to the module maintainers directly. Please don't file security issues in the bugtracker.
 
## Development and contribution
If you would like to make contributions to the module please ensure you raise a pull request and discuss with the module maintainers.
