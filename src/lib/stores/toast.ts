import { Toaster } from 'melt/builders';
import type { State } from '$lib/models/common';

export type ToastData = {
  title: string;
  description: string;
  state: State;
};

export const toaster = new Toaster<ToastData>({
  closeDelay: 2000,
});

export const addToast = toaster.addToast;
