define([], function () {

    function generateCarCard(event) {
        var template = document.querySelector('#car-card').innerHTML;
        template = template.replace('{{category}}', event.category);
        template = template.replace('{{summary}}', event.summary);
        template = template.replace('{{start}}',  moment(event.start*1000).format("DD.MM.YYYY"));
        template = template.replace('{{hour}}', event.hour);
        template = template.replace('{{location}}', event.location);
        template = template.replace('{{description}}', event.description);
        return template;
    }

    function createContent(events) {
        document.getElementById('first-load').innerHTML = "";
        var cardHTML = "";
        for (var i = 0; i < events.length; i++) {
            cardHTML += generateCarCard(events[i])
        }
        document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', cardHTML);
    }

    return {
        createContent: createContent
    }

});