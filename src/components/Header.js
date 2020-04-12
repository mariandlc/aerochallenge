import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import Counter from './Counter';
import EmptyCart from '../empty-states/EmptyCart';
import { CSSTransitionGroup } from 'react-transition-group'
import {findDOMNode} from 'react-dom';
import buywhite from '../assets/icons/buy-white.svg'
import aerologo from '../assets/aerolab-logo.svg'
import coin from '../assets/icons/coin.svg'
import back from '../assets/icons/arrow-left.svg'
import cart from '../assets/Cart2.jpg'


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }


    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    handleMobileSearch(e){
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }
    handleSearchNav(e){
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function(){
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }
    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        }
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    render() {
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			       return (
				<li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price"><img className="product-coin" src={coin} height="16px" alt="Monedas" />{product.cost}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ?"Items." : "Item." } </p>
                        <p className="amount"><img className="product-coin" src={coin} height="16px" alt="Monedas" />{product.quantity * product.cost}
                        </p>
                    </div>
                    <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                </li>
			)
		});
      let view;
      let difference = this.props.newPoints - this.props.total;
      if(cartItems.length <= 0) {
			view = <EmptyCart />
		} else {
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
    }
      return(
              <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src={cart} width="70px" height="50px"  alt="Aerolab Logo"/>
                    </div>

                  <div><a href="#" onClick={() => this.props.getCoins(1000)}><img src={coin} alt="Big Coin"/></a>
                  <p className="big-coin"><span>{difference}</span></p>
                  </div>

                  {/* <div className="cart-info">

                <table>
                  <tbody>
                  <tr>
                    <tr>
                      <td>+ Precio</td>
                    </tr>
                    <tr>
                      <td>- Precio</td>
                    </tr>
                  </tr>
                </tbody>
                </table>

              </div> */}

                      <div className="search">
                          <a className="mobile-search" href="#" onClick={this.handleMobileSearch.bind(this)}><img src="http://res.cloudinary.com/marianfrog/image/upload/e_blackwhite/v1516751236/search-green_bwsb2r.png" alt="search"/></a>
                          <form action="#" method="get" className={this.state.mobileSearch ? "search-form active" : "search-form"}>
                              <a className="back-button" href="#" onClick={this.handleSearchNav.bind(this)}><img src={back} alt="back"/></a>
                              <input type="search" ref="searchBox" placeholder="Hacé tu búsqueda..." className="search-keyword" onChange={this.props.handleSearch}/>
                              <button className="search-button" type="submit" onClick={this.handleSubmit.bind(this)}></button>
                          </form>
                      </div>

                    <div className="cart">
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Cantidad de items </td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Monedas usadas</td>
                                        <td>:</td>
                                        <td><strong>{this.props.total}</strong></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className={this.props.cartBounce ? "tada" : " "} src={buywhite} width="45px" height="45px" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                            <div className="action-block">
                                <button type="button" className={this.state.cart.length > 0 ? " " : "disabled"}>Checkout?</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
            )
          }
        }

export default Header;
