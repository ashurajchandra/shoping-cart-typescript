import { useState } from 'react';
import {useQuery} from 'react-query';
import {Grid,Drawer,Badge } from '@mui/material';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';
import { Wrapper } from './App.styles';
import Item from './Item/Item';

export type CartItemType = {
id:number;
category:string;
description:string;
image:string;
price:number;
title:string;
amount:number;
};

const getProducts =async (): Promise<CartItemType[]> => 
  await(await fetch('https://fakestoreapi.com/products')).json()

//console.log("getProducts",getProducts())

const App=()=> {
  const {data, isLoading,error} = useQuery<CartItemType[]>('products',getProducts);
  console.log(data);
  const getTotalItems = ()=> null;
  const handleAddToCart = (clickedItem:CartItemType)=> null;
  const handleRemoveCart = ()=> null;

   if(isLoading){
      return <LinearProgress></LinearProgress>;
   };
  if(error) return <div>something went wrong...</div>
  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item =>(
          <Grid key={item.id} xs={12} sm={4} >
            <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
        ))}

      </Grid>
    </Wrapper>
  );
}

export default App;
