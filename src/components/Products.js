import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../empty-states/NoResults";
import { CSSTransitionGroup } from 'react-transition-group'

class Products extends Component{
	constructor(){
		super();
	}

	// Mapping

  	render(){
    	let productsData;
    	let term = this.props.searchTerm;
    	let x;

		function searchingFor(term){
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}
		productsData = this.props.productsList.filter(searchingFor(term)).map(product =>{
			return(
						<Product key={product._id} id={product._id} name={product.name} cost={product.cost} category={product.category} image={product.img.url} imagehd={product.img.hdUrl} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} newPoints={this.props.newPoints} total={this.props.total} enoughPoints={this.props.enoughPoints}
 openModal={this.props.openModal}/>
				)
		}
	);

		// Empty and Loading States
		let view;
		if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if(productsData.length <= 0 && term){
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				{view}
			</div>
		)
	}
}

export default Products;
