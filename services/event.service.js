const getNotFullEvents = () => {
  const events = savedEvents;
  const usersEvents = userEvents;
  const userEventCount = new Map();
  events.forEach((eventx) => {
    userEventCount.set(eventx.name, { ...eventx, users: [] });
  });
  for (const userEvent of usersEvents) {
    let eventData = userEventCount.get(userEvent.registeredEvent);
    eventData.users.push(userEvent.user);
    userEventCount.set(userEvent.registeredEvent, eventData);
  }
  const res = [];
  userEventCount.forEach((eventx) => {
    if (eventx.users.length < eventx.capacity) {
      delete eventx.users;
      res.push(eventx);
    }
  });
  return res;
};

const { savedEvents, userEvents } = require("../data/events");

const createNewEventService = (newEvent) => {
  console.log("Current Events", savedEvents);
  savedEvents.push(newEvent);
  console.log("New Events after insert", savedEvents);
  return newEvent;
};

const getAllEventsService = () => {
  console.log(getNotFullEvents());
  const filteredEvents = getNotFullEvents();
  return filteredEvents;
};

const getEventsByDateService = (date) => {
  console.log(getNotFullEvents());

  const filteredEvents = getNotFullEvents();
  const dateFilteredEvents = filteredEvents.filter((newEvent) => {
    return newEvent.date === date;
  });
  console.log(dateFilteredEvents);
  return dateFilteredEvents;
};

module.exports = {
  createNewEventService,
  getAllEventsService,
  getEventsByDateService,
};
