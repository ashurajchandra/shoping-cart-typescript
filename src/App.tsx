import { useState } from 'react';
import {useQuery} from 'react-query';
import {Grid,Drawer,Badge } from '@mui/material';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';
import { Wrapper, StyledButton } from './App.styles';
import Item from './Item/Item';
import Cart from './Cart/Cart'

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const {data, isLoading,error} = useQuery<CartItemType[]>('products',getProducts);
  console.log(data);
  const getTotalItems = (items: CartItemType[])=>
  items.reduce((totalAmountItem:number, item)=>totalAmountItem + item.amount,0);
  const handleAddToCart = (clickedItem:CartItemType)=> {
    setCartItems(prev =>{
      //to check if the item is already present in the cart
      const isItemInCart = prev.find(item=>item.id === clickedItem.id)
      if(isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
          ?{...item, amount: item.amount + 1}
          : item
          );
      };
      //first time the item is added
      return [...prev, {...clickedItem, amount:1}]
    })
  };
  const handleRemoveFromCart = ()=> null;

   if(isLoading){
      return <LinearProgress></LinearProgress>;
   };
  if(error) return <div>something went wrong...</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(true)}>
        <Cart
      cartItems={cartItems}
      addToCart={handleAddToCart}
      removeFromCart={handleRemoveFromCart}
     />
      </Drawer>
      <StyledButton onClick={()=> setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'
        >
         <AddShoppingCartIcon/>
          </Badge></StyledButton>;
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
