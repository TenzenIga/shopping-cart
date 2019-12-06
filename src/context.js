import React, { Component } from 'react'
import { database, productDetail } from './data';


const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        productDetail:productDetail,
        cart:[],
        cartTotal:0,
        sidebarIsOpen:false
    }

    componentDidMount(){
        this.setProducts();
    }
    setProducts = () =>{
        let products = [];
        database.forEach(item =>{
            const singleItem = {...item};
            products = [...products, singleItem];
        })
        this.setState(()=>{
            return {products}
        })
    }
    getProduct=(id)=>{
        return this.state.products.find(item => item.id === id )
    };
    handleDetail = (id)=>{ 
        const product = this.getProduct(id);
        this.setState(()=>{
            return {productDetail:product}
        })  
    };
    deleteFromCart = (id)=>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getProduct(id));
        const product = tempProducts[index];
        product.inCart = false;
        product.count = 0;
        let cart = this.state.cart.filter(item=> id !== item.id)
        this.setState(()=>{
            return {cart, products:tempProducts}
        },
        ()=>{
            this.getTotalPrice()
        }
        )
    };
    addToCart = (id)=>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getProduct(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products:tempProducts, cart:[...this.state.cart, product]}
        },
        ()=>{
            this.getTotalPrice();
        }
        );
    }

    increment = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count += 1;
        product.total = product.price * product.count;
        this.setState(
            ()=>{
                return { cart: [...tempCart] };
            },
            ()=>{
                this.getTotalPrice();
            }
        )
    }
    decrement = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if(product.count === 0){
            this.deleteFromCart(id);
        }else{
            product.total = product.count * product.price;
            this.setState(
                ()=>{
                    return {cart: [...tempCart]};
                },
                () =>{
                    this.getTotalPrice();
                }
            )
        }
    }
    clearCart=()=>{
        
        this.setState(()=>{
            return {cart:[]}
        },
        ()=>{
            this.setProducts()
        }
        )
    }
    getTotalPrice=()=>{
        let total = 0;
        this.state.cart.forEach(item => total+=item.total)
        this.setState(()=>{
            return {cartTotal:total}
        })
    }
    filterProducts = (type, param)=>{
        let tempProducts = [...this.state.products]
        let products = tempProducts.map(item =>{ 
                if(item[type] !== param){
            item.show = false;
             return item;
                }else{
                    item.show = true;
                    return item;
                }
        })
        
        this.setState(()=>{
            return {products}
        })
    }
    clearFilter = ()=>{
        let tempProducts = [...this.state.products]
        const products = tempProducts.map(item => {
            item.show = true;
            return item;
        });
        this.setState(()=>{
            return {products}
        })
    }
    
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart:this.addToCart,
                deleteFromCart:this.deleteFromCart,
                increment:this.increment,
                decrement:this.decrement,
                clearCart:this.clearCart,
                filterProducts:this.filterProducts,
                clearFilter:this.clearFilter
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};