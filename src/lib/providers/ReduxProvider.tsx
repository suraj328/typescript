"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";
import { useSelector, useDispatch, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Custom typed hooks for Redux
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

// Client component to wrap the application and provide the Redux store
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  
  if (!storeRef.current) {
    // Create the store instance the first time the component renders
    storeRef.current = makeStore();
  }

  // The '!' non-null assertion is used because we guarantee storeRef.current is set 
  // by the time the component returns.
  return <Provider store={storeRef.current!}>{children}</Provider>;
}
