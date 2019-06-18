export function formatEvents(events) {
  const unsortedEvents = events.flatMap(event => {
    return event.dates.map(date => ({ ...event, dates: date }));
  });

  return unsortedEvents.sort(function(a, b) {
    const dateA = new Date(a.dates);
    const dateB = new Date(b.dates);
    return dateA - dateB;
  });
}
