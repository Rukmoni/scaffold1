import { create } from 'zustand';

interface UIState {
  isProfileMenuOpen: boolean;
  isMobileMenuOpen: boolean;
  isPassengerPopoverOpen: boolean;
  setProfileMenuOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setPassengerPopoverOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProfileMenuOpen: false,
  isMobileMenuOpen: false,
  isPassengerPopoverOpen: false,
  setProfileMenuOpen: (open) => set({ isProfileMenuOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setPassengerPopoverOpen: (open) => set({ isPassengerPopoverOpen: open }),
}));