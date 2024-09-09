import { ButtonLink, H2, H3, Image, TextBlock } from '../../../../components';
import styled from 'styled-components';

const ProductsCardContainer = ({
	className,
	id,
	title,
	image_url,
	description,
	price,
}) => {
	return (
		<div className={className}>
			<div className="content__item">
				<Image width="200px" height="200px">
					<img src={image_url} alt={title} />
				</Image>
				<div className="content__item-box">
					<H3>{title}</H3>
					<TextBlock>Id товара: {id}</TextBlock>
					<TextBlock>{description}</TextBlock>
					<div className="content__item-bottom">
						<H2 color="#FFCC00">{price}₽</H2>
						<ButtonLink className="content__item-link" to={`/product/${id}`}>
							Открыть карточку
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export const ProductsCard = styled(ProductsCardContainer)`
	.content__item {
		display: flex;
		column-gap: 35px;
	}

	.content__item-image {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		padding: 15px;
		height: 200px;
		width: 200px;
		border-radius: 35px;
		background-color: #fff;
	}

	.content__item-box {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		width: 100%;
	}

	.content__item-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 30px;
	}
`;
