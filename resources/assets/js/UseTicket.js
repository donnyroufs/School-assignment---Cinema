import Controller from "chetsbull";

const ENDPOINT = `http://localhost:3000/api/scan`;
const Ticket = new Controller({
  scope: "#search",
  route: "/useticket",
});

if (!Ticket.status) {
  Ticket.drink(({ view, state }) => {
    return {
      validateTicket: ({ e }) => {
        fetch(ENDPOINT + `?number=${view.ticketNumber.value}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      },
    };
  });
}

export default Ticket;
