import styled from 'styled-components';
import { ButtonIcon, H2, H3, IconDelete, Image, TextBlock } from '../../../../components';

const ProductCardContainer = ({ className, id, title, price, image_url }) => {
	return (
		<div className={className}>
			<Image width="200px" height="140px">
				<img src={image_url} alt={title} />
			</Image>
			<div className="product-card__content">
				<div className="product-card__top">
					<H3>{title}</H3>
					<ButtonIcon >
						<IconDelete/>
					</ButtonIcon>
				</div>

				<div className="product-card__line"></div>
				<div className="product-card__box">
					<TextBlock>Id товара: {id}</TextBlock>
					<H2 color="#FFCC00">
						{price}₽
					</H2>
				</div>
			</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: grid;
	grid-template-columns: 200px auto;
	align-items: center;
	column-gap: 35px;

	.product-card__content {
		display: flex;
		flex-direction: column;
		row-gap: 24px;
	}

	.product-card__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 30px;
	}

	.product-card__line {
		height: 1px;
		width: 100%;
		background-color: #fff;
	}

	.product-card__box {
		display: grid;
		grid-template-columns: 400px auto;
		justify-content: space-between;
		align-items: center;
		column-gap: 20px;
	}
`;
