import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';


const useStyles = makeStyles( theme =>({
    card: {
      minWidth: 200,
      padding: theme.spacing(2),
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
 
    media:{
      height:200
    },
    text:{
      display:'flex',
      justifyContent:'space-between'
    },
    
  }));

export default function StringItem(props) {
    const classes = useStyles();
    
    const { name, img, price} = props;
          
    return (
        <Card className={classes.card}>
        <CardContent>
        <CardMedia
        className={classes.media}
            image={img + '.jpg'}   
        />        
        </CardContent>
        <Typography color='initial' gutterBottom>
            {name.slice(0,29)}
          </Typography>     
        <CardActions className={classes.text}>
        <Typography  >
            {price} ₽
        </Typography>
          <Button size="small" >Купить</Button>
          </CardActions>

      </Card>
    )
}
