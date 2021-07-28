const createEventListTemplate = (...events) => (`
  <ul class="trip-events__list">
    ${events.map((event) => `<li class="trip-events__item">${event}</li>`).join('\n')}
  </ul>
`);

export { createEventListTemplate };
