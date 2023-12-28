import { create } from 'zustand';

type State = {
  infoModal: boolean;
  cartModal: boolean;
};

type Actions = {
  toggleInfoModal: (bool?: boolean) => void;
  toggleCartModal: (bool?: boolean) => void;
};

const initialState: State = {
  infoModal: false,
  cartModal: false,
};

const useModalStore = create<State & Actions>()((set) => ({
  ...initialState,
  toggleInfoModal: (bool) => set((state) => ({ infoModal: bool !== undefined ? bool : !state.infoModal })),
  toggleCartModal: (bool) => set((state) => ({ cartModal: bool !== undefined ? bool : !state.cartModal })),
}));

export { useModalStore };
