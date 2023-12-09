import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/features/store';
import { Product, addProduct, fetchProduct } from '../store/features/productSlice';

export const AddProduct = () => {
    console.log("add product");
   
    // const dispatch = useAppDispatch();
    // const productDetails: Product = {
    //     id: 1,
    //     title: 'Example Product',
    //     price: 19.99,
    //     description: 'This is an example product description.',
    //     image: 'example.jpg',
    //     rating: {
    //       rate: 4.5,
    //       count: 10,
    //     },
    //   };
    // dispatch(addProduct(productDetails));
    // showing data
    const dispatch = useAppDispatch();
    dispatch(fetchProduct());
    const productData = useAppSelector((state)=>state.product.product);
    console.log(productData);
  return (
    <div>AddProduct</div>
  )
}
