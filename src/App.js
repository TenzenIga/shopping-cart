import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';
import StringsList from './components/StringsList';
import Cart from './components/Cart';
import Details from './components/Details';
import Default from './components/Default';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListSubheader, ListItem} from '@material-ui/core';
import { ProductConsumer } from './context';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    overflowX:'hidden',
    display: 'flex',
  },
  appBar: {
    
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  navMenu:{
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ProductConsumer>
      {
        (val)=>{
          const {filterProducts, clearFilter} = val;
          return(
            <div className={classes.root}>
            <CssBaseline />
            <AppBar 
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
              >
              <Toolbar>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}>
                
                  <MenuIcon />
                 
                </IconButton>
                
                <div className={classes.navMenu}>
                <Typography onClick={()=> clearFilter()} component={Link} to="/" color="inherit" variant="h6" className={classes.title}>
                  GuitarCollectors
                </Typography>
                <IconButton component={Link} to="/cart" color="inherit" >
                    <ShoppingCartIcon />
                </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem  >
                    <ListItemText onClick={()=> {clearFilter()}} >Все товары</ListItemText>
                </ListItem>
                <ListItem button  onClick={()=>filterProducts('type','str')} to='/' component={Link} >
                    <ListItemText>Струны</ListItemText>
                </ListItem>
                <ListItem button onClick={()=>filterProducts('type','bag')} to='/' component={Link} >
                    <ListItemText>Чехлы</ListItemText>
                </ListItem>
                <ListItem button onClick={()=>filterProducts('type','cable')} to='/' component={Link} >
                    <ListItemText>Провода</ListItemText>
                </ListItem>
                <ListItem button onClick={()=>filterProducts('type','pick')} to='/' component={Link} >
                    <ListItemText >Медиаторы</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <ListSubheader component="div" >
                Бренды
              </ListSubheader>
              <List>
                {['D`Addario','Elixir','Ernie Ball', 'Dunlop', 'BAG&music'].map((text, index) => (
                  <ListItem button key={text} onClick={()=>filterProducts('brand',text)} >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <main  className={clsx(classes.content, {
                [classes.contentShift]: open,
              })} >
              <div className={classes.drawerHeader} />
              <Switch>
              <Route path="/" exact component={StringsList} />
              <Route path="/detail" component={Details} />
              <Route path="/cart" component={Cart} />
              <Route  component={Default} />
              </Switch>
              </main>
          </div>
          )
        }
      } 
    </ProductConsumer>

  );
}