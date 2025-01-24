const {
  createNewEventService,
  getAllEventsService,
  getEventsByDateService,
} = require("../services/event.service");

const createNewEvent = (req, res) => {
  const { name, date, capacity, ticketPrice } = req.body;
  if (!name || !date || !capacity || !ticketPrice) {
    throw new Error("Missing fields", 400);
  }

  // Validate Date
  const currentDate = Date.now();
  const eventDate = Date.parse(date);

  if (currentDate > eventDate) {
    return res
      .status(400)
      .send({ message: "Event date should be in the future" });
  }

  // Validate Capacity
  if (capacity < 10 || capacity > 200) {
    return res.status(400).send({ message: "Capacity beyond required limits" });
  }

  // Validate Ticket price
  if (ticketPrice < 0) {
    return res
      .status(400)
      .send({ message: "Ticket price should be greater than 0" });
  }

  const newEvent = {
    name,
    capacity,
    date,
    ticketPrice,
  };
  const insertedEvent = createNewEventService(newEvent);
  res.status(200).send(insertedEvent);
};

const getAllEvents = (req, res) => {
  const { date } = req.query;
  if (!date) {
    console.log("No date provided, returning all events (No full capacity)");
    const registeredEvents = getAllEventsService();
    return res.status(200).send(registeredEvents);
  }
  const filteredEvents = getEventsByDateService(date);
  return res.status(200).send(filteredEvents);
};

module.exports = { createNewEvent, getAllEvents };
