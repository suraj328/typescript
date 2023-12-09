import  { PersonSlice } from "./personSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";

// by the help of configure store  we create a store 
export const store = configureStore({
    // reducer store created slice 
    reducer:{
        // here person is a slice name
        // PersonSLice.reducer have used by importing
        person: PersonSlice.reducer
    }
});

// here we have exported type of dispatch and app selectore 
// root state store data types
export type RootState = ReturnType<typeof store.getState>;
// exported useAppDispatch method by storing into useDispatch for invoking createSlice rducer method
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// exported useAppSelector method by storing into useSelector to access data inside of store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;