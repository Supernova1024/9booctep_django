(function ($) {
  // initialize the external events
  $("#external-events .fc-event").each(function () {
    // store data so the calendar knows to render an event upon drop
    $(this).data("event", {
      title: $.trim($(this).text()), // use the element's text as the event title
      stick: true, // maintain when user navigates (see docs on the renderEvent method)
    });
    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 999,
      revert: true, // will cause the event to go back to its
      revertDuration: 0, //  original position after the drag 
    });
  });

  let date = new Date();

  let familyEvents = {
    id: 1,
    events: [
      
      {
        id: "1",
        start: moment().format('YYYY-MM-17') + "T08:30:00",
        title: "Family Events",
      },
      {
        id: "2",
        start: moment().format('YYYY-MM-DD') + "T10:30:00",
        end: moment().format('YYYY-MM-DD') + "T12:00:00",
        title: "Dinner with Family",
      },
    ],
    className: "primary",
    textColor: "#5F63F2",
  };

  let productLaunch = {
    id: 2,
    events: [
      {
        id: "1",
        start: moment().format('YYYY-MM-20') + "T01:00:00",
        title: "Product Lunch",
      },
    ],
    className: "secondary",
    textColor: "#FF69A5",
  };

  let teamMeeting = {
    id: 3,
    events: [
      {
        id: "1",
        start: moment().format('YYYY-MM-DD') + "T18:30:00",
        title: "Team Meeting",
      },
    ],
    className: "success",
    textColor: "#20C997",
  };

  let projectUpdate = {
    id: 4,
    events: [
      {
        id: "1",
        start: moment().format('YYYY-MM-25') + "T11:00:00",
        title: "Team Meeting",
      },
      {
        id: "2",
        start: moment().format('YYYY-MM-DD') + "T07:00:00",
        end: moment().format('YYYY-MM-DD') + "T08:30:00",
        title: "StrikingDash Calendar App",
      },
    ],
    className: "warning",
    textColor: "#FA8B0C",
  };

  document.addEventListener("DOMContentLoaded", function () {
    var fullCalendar = document.getElementById("full-calendar");
    if (fullCalendar) {
      var calendar = new FullCalendar.Calendar(fullCalendar, {
        headerToolbar: {
          left: "today,prev,title,next",
          right: "timeGridDay,timeGridWeek,dayGridMonth,listMonth",
        },
        views: {
          listMonth: {
            buttonText: "Schedule",
            titleFormat: { month: "short", weekday: "short" },
          }
        },
        listDayFormat: true,
        listDayAltFormat: true,
        allDaySlot: false,
        editable: true,
        eventSources: [familyEvents, productLaunch, teamMeeting, projectUpdate],
        contentHeight: 800,
        initialView: "timeGridDay",
        eventDidMount: function (view) {
          $(".fc-list-day").each(function () {});
        },
        eventClick: function (infoEvent) {
          console.log(infoEvent.event.title);
          let infoModal = $("#e-info-modal");
          infoModal.modal("show");
          console.log(infoModal.find(".e-info-title"));
          infoModal.find(".e-info-title").text(infoEvent.event.title);
        },
      });

      let eventElement = document.getElementById("draggable-events");
      let draggable = new FullCalendar.Draggable(eventElement, {
        itemSelector: ".draggable-event-list__single",
        eventData: function (eEl) {
          return {
            title: eEl.innerText,
            className: $(eEl).data("class"),
          };
        },
      });
      calendar.render();
      $('.fc-button-group .fc-listMonth-button').prepend( '<i class="las la-list"></i>' );
    }
  });
  
})(jQuery);
