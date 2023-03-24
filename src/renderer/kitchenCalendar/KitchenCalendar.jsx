import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  addKitchenEvent,
  getAllKitchenEvents,
} from "../../services/kitchenCalendar";
import { getAllUsers } from "../../services/users";
import { Button, Modal, Form } from "react-bootstrap";

function KitchenCalendar() {
  const [cooks, setCooks] = useState([]);
  const [selectedCook, setSelectedCook] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    addKitchenEvent({
      title: formData.get("cookSelector"),
      start:
        formData.get("svcDateSelector") +
        " " +
        formData.get("svcStartSelector"),
      end:
        formData.get("svcDateSelector") + " " + formData.get("svcEndSelector"),
      color: formData.get("colorSelector"),
    });
    console.log(formData);
  }

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        console.log(response);
        setCooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllKitchenEvents()
      .then((response) => {
        setEventsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Planning de la cuisine</h1>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un équipier
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'équipier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="cookSelector">
              <Form.Select
                controlId="cookSelector"
                size="lg"
                aria-label="Sélection d'un équipier"
                onChange={(event) => setSelectedCook(event.target.value)}
                defaultValue=""
                name="cookSelector"
              >
                <option value="" disabled>
                  Sélection d'un cuisinier
                </option>
                {cooks.map((cook) => {
                  if (cook.userRole === "ROLE_COOK") {
                    return (
                      <option key={cook._id} value={cook._id}>
                        {cook.firstName} {cook.lastName}
                      </option>
                    );
                  }
                  return null;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="svcDateSelector">
              <Form.Label>Sélection de la date</Form.Label>
              <Form.Control type="date"name="svcDateSelector" ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="svcStartSelector">
              <Form.Label>Début du service</Form.Label>
              <Form.Control type="time" name="svcStartSelector"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="svcEndSelector">
              <Form.Label>Fin du service</Form.Label>
              <Form.Control type="time" name="svcEndSelector"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="colorSelector">
              <Form.Label>
                Sélectionner une couleur d'affichage pour ce service
              </Form.Label>
              <Form.Control type="color" defaultValue="#563D7C" name="colorSelector" />
            </Form.Group>z
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={["fr"]}
        events={eventsList.data}
      />
    </>
  );
}

export default KitchenCalendar;
