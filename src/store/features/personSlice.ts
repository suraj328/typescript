import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// payloadAction is datatype and createSlice use for creating store

// just a datatype interface
export interface Person{
    id:number,
    name:string
}
// types of data type should be store have been declare by interface
interface PersonState{
    persons: Person[];
}
// create state by extending personstate to make sure data type
// declare list inside it so data can be stored
const initialState : PersonState ={
    persons:[],
}
// created slice to store data
export const PersonSlice = createSlice({
    // name field store the name of slice
    name:"person",
    initialState,
    reducers:{
        // declare method inside show you can update store with data
        // every method should take two params here state target initial state list and action recive data need to update in store
        addPerson:(state,action:PayloadAction<{name:string}>)=>{
            // state target initialstate
            // push used for store data
            state.persons.push({
                id:state.persons.length,
                name:action.payload.name
            });
        },
    }
});
// export .reducer for dispatching
// exporting .actions for reciving data
export default PersonSlice.reducer;
export const {addPerson} = PersonSlice.actions;