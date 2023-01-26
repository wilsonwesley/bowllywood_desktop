import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getAllKitchenEvents } from "../../services/kitchenCalendar";

function KitchenCalendar() {
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    getAllKitchenEvents()
      .then((response) => {
        console.log(response.data);
        const correctedEvents = Object.values(response.data).map((event) => {
          return {
            title: event.eventPeople,
            start: event.eventStart,
            end: event.eventEnd,
            color: event.eventColor,
          };
        });
        setEventsList(correctedEvents);
        console.log(eventsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Planning de la cuisine</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={["fr"]}
        events={eventsList}
      />
    </>
  );
}

export default KitchenCalendar;
