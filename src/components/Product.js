import React, {Component} from 'react';
import Counter from './Counter';
import coin from '../assets/icons/coin.svg'

class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            buttonLabel: "CANJEAR!",
        };
    }
    resetQuantity(){
    }

    addToCart(image, name, cost, id, quantity){
        this.setState({
            selectedProduct: {
							  id: id,
                image: image,
                name: name,
                cost: cost,
                quantity: quantity,
            }
        },
				function(){
        this.props.addToCart(this.state.selectedProduct);
				}
			)

			if (this.props.enoughPoints) {
				console.log(this.props.enoughPoints)
				this.setState({
            buttonLabel: "OK!"
        }, function(){
            setTimeout(() => {
                this.setState({
                    buttonLabel: "CANJEAR!",
                    selectedProduct: {}
                });
            }, 5000);
        });
			}

			else {
				this.setState({
						buttonLabel: "SIN MONEDAS!"
				}, function(){
						setTimeout(() => {
								this.setState({
										buttonLabel: "CANJEAR!",
										selectedProduct: {}
								});
						}, 5000);
				});
			}
		}

    quickView(imagehd, name, cost, id){
        this.setState({
            quickViewProdcut: {
							  id: id,
								imagehd: imagehd,
                name: name,
                cost: cost
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }

    render()
				{
        let image = this.props.image;
				let imagehd = this.props.imagehd;
        let name = this.props.name;
        let cost = this.props.cost;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
			//if ((this.props.addToCart) !== false) {
			// 	if (this.addToCart) {
			// 	var button = <button type="button" onClick={this.addToCart.bind(this, image, name, cost, id, quantity)}>{this.state.buttonLabel}</button>
			// } else {
			// 	var button = <button type="button" onClick={this.outOfPoints.bind(this)}>{this.state.buttonLabel}</button>
			// 	}
        return(
            <div className="product">
                <div className="product-image">
                    <img src={image} alt={name} onClick={this.quickView.bind(this, imagehd, name, cost, id, quantity)}/>
                </div>
                <h4 className="product-name">{name}</h4>
                <p className="product-price"><img className="product-coin" src={coin} alt="Monedas" />{cost}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                <div className="product-action">
									{/* {button} */}
                    <button type="button" onClick={this.addToCart.bind(this, image, name, cost, id, quantity)}>{this.state.buttonLabel}</button>
                </div>
            </div>
        )
    }
}

export default Product;
