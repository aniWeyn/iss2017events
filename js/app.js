var icalService = require('./icalService.js');
var template = require('./icalTemplate.js');

Promise.all([
    icalService.readICalendar(),
    icalService.readMealTimeExceptions(),
    icalService.readNls()
]).then(function (eventLists){
    var eventList = [].concat.apply([], eventLists);
    eventList.sort(function(event1, event2){
        return event1.start-event2.start
    })
    template.createContent(eventList)
})