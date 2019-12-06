import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ProductConsumer } from '../context';

const useStyles = makeStyles((theme)=> ({
    main:{
        maxWidth: 850,
        display:'flex',
        marginTop: 50,
        margin:'auto',
        [theme.breakpoints.down('md')]: {
            flexDirection:'column',
            marginTop: 50
          },
        
    },
    media:{
        width: 500,
        height:500,
        [theme.breakpoints.down('md')]: {
            width:270,
            height:270,
            margin:'auto',
          },
    },
    content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    cardAction:{
        display:'flex',
        justifyContent:'space-between'
    },

    link:{
      textDecoration:'none'
    },
  }));

export default function Details() {
    const classes = useStyles()
    return (
        <ProductConsumer>
            {
                (value)=>{
                    const {id,img, name, size, desc, price, inCart} = value.productDetail;

                    return(
                    <Card className={classes.main} >
                    <CardMedia 
                        className={classes.media}
                        image={img + '.jpg'}   
                    />
                    <CardContent className={classes.content}>
                       <div>
                       <Typography gutterBottom variant="h5" component="h2" >{name.toUpperCase()}</Typography>
                        <Divider />
                       
                        <Typography variant="body1"  component="p" > {desc} </Typography>
                        <Typography>Размер: {size}</Typography>
                                 </div>  
                    <CardActions className={classes.cardAction} >
                    <Typography variant="h5" >{price} ₽</Typography>
                            {
                                inCart?     
                                (
                                    <IconButton component={Link} to="/cart" color="inherit" >
                                        <ShoppingCartIcon fontSize='large' />
                                    </IconButton>
                                )
                                :
                                (
                                    <IconButton onClick={()=>{ value.addToCart(id) }} >
                                        <AddShoppingCartIcon fontSize='large' />
                                    </IconButton>
                                )
                            }
                            
                    </CardActions>   
                    </CardContent>
                    
                </Card>
                    )
                }
            }
          
        </ProductConsumer>
      
    )
}
