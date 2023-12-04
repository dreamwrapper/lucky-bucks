import { create } from 'zustand';

type State = {
  ticket: number[];
  tickets: number[][];
};

type Actions = {
  addTicket: (ticketNumber: number) => void;
  removeTicket: (ticketNumber: number) => void;
  resetTicket: () => void;
  addTickets: (tickets: number[]) => void;
  removeTickets: (ticketIndex: number) => void;
};

const initialState: State = {
  ticket: [0, 0, 0, 0, 0, 0],
  tickets: [],
};

const useTicketStore = create<State & Actions>()((set) => ({
  ...initialState,
  addTicket: (ticketNumber) =>
    set((state) => ({
      ticket: [...state.ticket.slice(0, state.ticket.indexOf(0)), ticketNumber, ...state.ticket.slice(state.ticket.indexOf(0) + 1)].slice(0, state.ticket.length),
    })),
  removeTicket: (numberIndex) =>
    set((state) => ({
      ticket: [...state.ticket.slice(0, numberIndex), 0, ...state.ticket.slice(numberIndex + 1)].sort((a, b) => b - a).slice(0, state.ticket.length),
    })),
  resetTicket: () =>
    set((state) => ({
      ticket: state.ticket.map((number, _) => (number = 0)),
    })),
  addTickets: (tickets: number[]) =>
    set((state) => ({
      tickets: [...state.tickets, tickets],
    })),
  removeTickets: (ticketIndex: number) =>
    set((state) => ({
      tickets: state.tickets.filter((_, index) => index !== ticketIndex),
    })),
}));

export { useTicketStore };
