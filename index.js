// As an event organizer
// I want to create new events
// So that I can start accepting registrations

// Acceptance Criteria:
// - POST /api/events
// - Required fields: name, date, capacity, ticketPrice
// - Date must be in the future
// - Capacity must be between 10-200 people
// - Ticket price must be > $0

// - GET /api/events
// - Should return all events
// - GET /api/events?date=YYYY-MM-DD
// - Should filter events by date
// - Should only show events that aren't full
// -

const express = require("express");
const {
  createNewEvent,
  getAllEvents,
} = require("./controllers/event.controller");
const app = express();
app.use(express.json());

app.post("/api/events", createNewEvent);

app.get("/api/events", getAllEvents);

app.listen(3000, () => {
  console.log("Listening to port", 3000);
});
