import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Products from './components/Products';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import QuickView from './components/QuickView';

class App extends Component {
	constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			newPoints: '',
			term: '',
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			enoughPoints: true,
			modalActive: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.getCoins = this.getCoins.bind(this);
		this.redeemProduct = this.redeemProduct.bind(this);
		axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTIwODgwZmYzNWEzYjAwNzk2N2FkNzUiLCJpYXQiOjE1MTIwODE0MjN9.o_RlWIRNeiYWM751BGGvvL8lampVLAUBdn51W1hb900";
	}

// Funciones API

	getData(){
		const productsUrl="https://aerolab-challenge.now.sh/products";
		axios.get(productsUrl)
		.then(response => {
			this.setState({
				products : response.data
			})
		})
	}

	getCoins(amount){
			const pointsUrl="https://aerolab-challenge.now.sh/user/points";
			axios.post(pointsUrl, {amount})
			.then(response => {
				this.setState({
					newPoints : response.data['New Points']
				})
				console.log(this.state.newPoints);
			})
		}

	getInfo(){
		const infoUrl="https://aerolab-challenge.now.sh/user/me";
		axios.get(infoUrl)
		.then(response => {
			this.setState({
				newPoints : response.data.points
			})
		})
	}

	redeemProduct(productId){
		const redeemUrl="https://aerolab-challenge.now.sh/redeem";
		axios.post(productId)
		.then(response => {
			console.log(response.data.message)
		})
	}

	componentWillMount(){
		this.getData();
		this.getInfo();
	}

	// Search by Keyword
	handleSearch(event){
		this.setState({term: event.target.value});
	}
	// Mobile Search Reset
	handleMobileSearch(){
		this.setState({term: ""});
	}
	// Filter by Category
	handleCategory(event){
		this.setState({category: event.target.value});
		console.log(this.state.category);
	}

	// Add to Cart
	handleAddToCart(selectedProducts){
		let selectedItem = this.state.products.id
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		let total = this.state.totalAmount;
		//console.log((this.state.newPoints - this.state.totalAmount) - (selectedProducts.quantity * selectedProducts.cost));
		let result = ((this.state.newPoints - total) - (productQty * selectedProducts.cost));

		if (result >= 0) {
			this.setState({
				enoughPoints: true
			})

		if(this.checkProduct(productID)){
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		setTimeout(function(){
			this.setState({
				cartBounce:false,
				quantity: 1
			});
    }.bind(this),1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);

} else {
	this.setState({
		enoughPoints: false
	})
	}
}


	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		});
	}
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }
	sumTotalAmount(){
        let total = 0;
        let cart = this.state.cart;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].cost * parseInt(cart[i].quantity);
        }
		this.setState({
			totalAmount: total
		})
    }

	//Reset Quantity
	updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
	}
	// Open Modal
	openModal(product){
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal(){
		this.setState({
			modalActive: false
		})
	}

	render(){
		return (<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					newPoints={this.state.newPoints}
					getCoins={this.getCoins}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					handleMobileSearch={this.handleMobileSearch}
					handleCategory={this.handleCategory}
					categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
				/>
				<Products
					productsList={this.state.products}
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					total={this.state.totalAmount}
					newPoints={this.state.newPoints}
					redeemProduct={this.redeemProduct}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
					enoughPoints={this.state.enoughPoints}
				/>
				<Footer />
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />
			</div>
		)
	}
}

export default App;
