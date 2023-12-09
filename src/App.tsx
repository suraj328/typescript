import React, { useEffect } from 'react';
import { Add } from './component_design/Add';
import { List } from './component_design/List';
import { AddProduct } from './component_design/AddProduct';
import { useAppDispatch } from './store/features/store';
import { fetchProduct } from './store/features/productSlice';


function App() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
      dispatch(fetchProduct());
  })
  return (
    <>
      <Add/>
      <List/>
      <AddProduct/>
    </>
  );
}
export default App;
