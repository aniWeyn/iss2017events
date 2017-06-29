define([], function () {

    var apiUrlPath = 'https://cors-anywhere.herokuapp.com/http://www.uio.no/english/studies/summerschool/social-activities/events/social-events/?vrtx=ical';

    function readICalendar() {
        return fetch(apiUrlPath)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                return parseToObject(data);
            })
    }

    function parseToObject(iCalendarData) {

        var jcalData = ICAL.parse(iCalendarData);
        var comp = new ICAL.Component(jcalData);
        var vevent = comp.getAllSubcomponents("vevent");
        var events = vevent.map(function (event_row) {
            var event = new ICAL.Event(event_row);
            var startDate = moment(event.startDate.toUnixTime() * 1000)
            return {
                summary: event.summary,
                start: startDate.unix(),
                location: event.location,
                description: event.description,
                category: "issEvent"
            }
        })
        return events
    }


    var mealTimeUrl = "/calendar/mealTimeExceptions.json";

    function readMealTimeExceptions() {
        return fetch(mealTimeUrl)
            .then(extractJsonFromResp)
            .then(transformDataInEvents)
    }

    var nlsUrl = "/calendar/nls.json";

    function readNls() {
        return fetch(nlsUrl)
            .then(extractJsonFromResp).then(transformDataInEvents)
    }

    function extractJsonFromResp(response) {
        return response.json()
    }

    function toUnixTime(data) {
        return moment(data, "DD.MM.YYYY").unix()
    }

    function transformDataInEvents(events) {
        return events.map(function (event) {
            event.start = toUnixTime(event.start)
            return event
        })
    }

    return {
        readICalendar: readICalendar,
        readMealTimeExceptions: readMealTimeExceptions,
        readNls: readNls
    }
});