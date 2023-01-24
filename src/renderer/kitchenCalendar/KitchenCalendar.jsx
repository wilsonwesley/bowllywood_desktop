import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"

function KitchenCalendar() {
  return (
    <>
      <h1>Planning de la cuisine</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={["fr"]}
        events={[
            { title: 'Isidore', start: '2023-01-01 08:00', end: '2023-01-05 10:00', color: 'red' },
            { title: 'Alfred', date: '2023-01-02', color: 'orange' }
          ]}
      />
    </>
  );
  
}

export default KitchenCalendar;
