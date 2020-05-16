import Controller from "chetsbull";

// Gets data prop from the server!
console.log(data);

const Picker = new Controller({
  scope: "#picker",
  log: true,
});

Picker.drink(({ view, state }) => {
  return {};
});
