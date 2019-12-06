import React from 'react'
import { ProductConsumer } from '../context'
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import { Divider,Paper, Typography } from '@material-ui/core';
import CartTotal from './CartTotal';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop:50
},
}));

export default function Cart() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
       Корзина   
        </Typography>
        <ProductConsumer>
            {(value)=>{
                const {cart} = value;
            if(cart.length > 0)
            {
                return(
                    <>
                    <Typography component="p">
                    Товаров в корзине: {cart.length} 
                    </Typography>
                    {value.cart.map(item =>{
                        return <CartItem key={item.id} desc={item.desc} img={item.img} price={item.price} count={item.count} name={item.name} id={item.id} />
                    })}
                    <Divider />
                    <CartTotal value={value}>
                    </CartTotal> 
                          
                </>)
            }else{
                return (<Typography align='center'component='h4'>
                        Корзина пуста
                    </Typography> 
                )
            }
            }}
        </ProductConsumer>
        
        </Paper>
    )
}
