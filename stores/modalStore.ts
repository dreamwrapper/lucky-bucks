import { create } from 'zustand';

type State = {
  cartModal: boolean;
};

type Actions = {
  toggleCartModal: (bool?: boolean) => void;
};

const initialState: State = {
  cartModal: false,
};

const useModalStore = create<State & Actions>()((set) => ({
  ...initialState,
  toggleCartModal: (bool) => set((state) => ({ cartModal: bool !== undefined ? bool : !state.cartModal })),
}));

export { useModalStore };
