import React from 'react'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=> ({
    buttons:{
        display:'flex',
        marginTop: 10,
        justifyContent:'space-between',
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column',
            '& button':{
                marginTop:20
            } 
        },
    }
}));

export default function CartTotal({value}) {
    const classes = useStyles()
    const {cartTotal, clearCart} = value;
    return (
        <>
            <Typography variant='h5' component='h5' >
                Всего:{cartTotal} ₽  
            </Typography> 
           <div className={classes.buttons}>
               <Button variant="contained" onClick={()=>clearCart()} color="secondary">
        Очистить корзину
      </Button>
           <Button variant="contained"  color="primary">
        Оформить заказ
      </Button>
        </div>           
         
               
           

        </>
    )
}
