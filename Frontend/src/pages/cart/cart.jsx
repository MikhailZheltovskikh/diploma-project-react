import styled from 'styled-components';
import { AsideBlock, Button, ContentContainer, H2, TextBlock } from '../../components';
import { ProductCard } from './ui';
import { useSelector } from 'react-redux';
import { selectUserCart } from '../../redux/selectors';

const CartContainer = ({ className }) => {
	const products = useSelector(selectUserCart);

	let sum = 0;

	products.forEach((product) => {
		sum += Number(product.price);
	});

	return (
		<div className={className}>
			<ContentContainer>
				<H2>Корзина</H2>
				<div className="basekt">
					<div className="basekt-content">
						{products.map(({ id, title, image_url, price }) => (
							<ProductCard
								id={id}
								key={id}
								title={title}
								image_url={image_url}
								price={price}
							/>
						))}
					</div>
					<AsideBlock title="В корзине">
						<TextBlock color="#000" className="aside__amount">
							{products.length} товар(а)
						</TextBlock>
						<div className="aside__line"></div>
						<div className="aside__price-box">
							<TextBlock color="#000" className="aside__price-title">
								Итого:
							</TextBlock>
							<H2 color="#FFCC00" className="basekt-aside__price">
								{sum}₽
							</H2>
						</div>
						<Button className="basekt-aside__order">Оформить заказ</Button>
					</AsideBlock>
				</div>
			</ContentContainer>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	.basekt {
		margin-top: 40px;
		display: grid;
		grid-template-columns: auto 260px;
		gap: 40px;
	}

	.basekt-content {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}

	.aside__amount {
		padding: 0 20px;
		margin-top: 35px;
	}

	.aside__line {
		height: 1px;
		width: calc(100% - 40px);
		margin: 0 auto;
		margin-top: 35px;
		background-color: #000;
	}

	.aside__price-box {
		padding: 0 20px;
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 10px;
	}

	.aside__price-title {
		font-weight: 700;
	}

	.basekt-aside__order {
		margin-top: 20px;
	}
`;
