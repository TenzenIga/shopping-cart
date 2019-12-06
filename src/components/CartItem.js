import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { ProductConsumer } from '../context';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    count:{
        display:'flex',
        alignItems:'center'
    }
  }));

export default function CartItem(props) {
    const {id, img, name, price, count, desc} = props;
    const classes = useStyles();
    return (
              <ProductConsumer>
                  {
                      (val)=>{
                    const {increment, decrement, deleteFromCart} = val;
                    return(
                        <>
                        <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={img + '.jpg'} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography component={Link} onClick={()=>{val.handleDetail(id)}} to='/detail' gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {desc}
                </Typography>
                <div className={classes.count}>
                <IconButton onClick={()=>decrement(id)} >
                    <RemoveIcon />
                </IconButton>
                <Typography variant="subtitle1">{count}</Typography>
                <IconButton onClick={()=>increment(id)} >
                    <AddIcon />
                </IconButton>          
                </div>
            
              </Grid>
              <Grid item>
                <IconButton onClick={()=>deleteFromCart(id)} >
                    <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{price} ₽</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div> 
                     </> 
                           )
                       }
                  }                       
              </ProductConsumer>
           
               
        
    )
}
