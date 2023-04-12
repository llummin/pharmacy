import React from 'react';

interface Product {
	id: string;
	name: string;
	price: number;
	manufacturer: string;
	form: string;
	quantity: number;
	ingredients: string;
	dosage: string;
	image: string;
}

interface ProductProps {
	product: Product;
}

const ProductCard: React.FC<ProductProps> = ({product}) => {
	return (
		<div className="product-card">
			<ProductImage image={product.image}/>
			<ProductInfo product={product}/>
			<BuyButton/>
		</div>
	);
};

const ProductImage: React.FC<{ image: string }> = ({image}) => {
	return (
		<div className="product-image">
			<img src={image} alt="Product"/>
		</div>
	);
};

const ProductInfo: React.FC<ProductProps> = ({product}) => {
	return (
		<div className="product-info">
			<h2>{product.name}</h2>
			<p className="product-price">{product.price} ₽</p>
			<p>Производитель: {product.manufacturer}</p>
			<p>Форма выпуска: {product.form}</p>
			<p>Количество в упаковке: {product.quantity}</p>
			<p>Действующие вещества: {product.ingredients}</p>
			<p>Дозировка: {product.dosage}</p>
		</div>
	);
};

const BuyButton: React.FC = () => {
	return (
		<div className="buy-button">
			<button>Купить</button>
		</div>
	);
};

export default ProductCard;
