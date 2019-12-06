import React from 'react'
import StringItem from './StringItem'
import { ProductConsumer } from '../context'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
      marginTop:50,
      flexGrow: 1,
    },
    link:{
      textDecoration:'none',
    }
  }));

export default function StringsList() {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container  spacing={2}>
            <ProductConsumer>
                {
                    (val)=>{
                     return  val.products.map(item => 
                      item.show &&
                      <Grid 
                        onClick={()=>{val.handleDetail(item.id)}}
                        className={classes.link}
                        to='/detail'
                        key={item.id}
                        item xs={12} sm={6} md={4} lg={3}
                        component={Link} >
                          <StringItem  name={item.name} img={item.img} size={item.size} price={item.price} />
                      </Grid> );
                    }
                }
            </ProductConsumer>
            </Grid>
    )
}
