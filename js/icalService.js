define(['./icalTemplate.js'], function (icalTemplate) {

    var apiUrlPath = 'https://cors-anywhere.herokuapp.com/http://www.uio.no/english/studies/summerschool/social-activities/events/social-events/?vrtx=ical';

    function readICalendar() {
        fetch(apiUrlPath)
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                return parseToObject(data);
            }).then(function (data) {
                icalTemplate.createContent(data)
            })
    }

    function parseToObject(iCalendarData) {

        var jcalData = ICAL.parse(iCalendarData);
        var comp = new ICAL.Component(jcalData);
        var vevent = comp.getAllSubcomponents("vevent");
        var events = vevent.map(function (event_row) {
            var event = new ICAL.Event(event_row);
            return {
                summary: event.summary,
                start: event.startDate.day,
                location: event.location,
                description: event.description,
                end: event.endDate
            }
        })
        return events
    }

    return {
        readICalendar: readICalendar
    }
});