import {
	Breadcrumbs,
	Button,
	ContentContainer,
	H2,
	H3,
	Image,
	TextBlock,
} from '../../components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';
import { loadProductAsync } from '../../action';
import { selectProduct } from '../../selectors';

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);

	useEffect(() => {
		dispatch(loadProductAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id]);

	return (
		<>
			<ContentContainer>
				<Breadcrumbs />
				<div className={className}>
					<Image className="product-image" width="500px" height='400px'>
						<img src={product.image_url} alt="" />
					</Image>
					<div className="product-content">
						<H3>{product.title}</H3>
						<TextBlock>Количество: {product.amount} шт.</TextBlock>
						<TextBlock className="product-characteristics">
							{product.description}
						</TextBlock>
						<div className="product-bottom">
							<H2 color="#FFCC00">{product.price}₽</H2>
							<Button maxWidth="220px">Купить</Button>
						</div>
						<div className="product-line"></div>
						<TextBlock className="product-id">
							Id товара: {product.id}
						</TextBlock>
					</div>
				</div>
			</ContentContainer>
		</>
	);
};

export const Product = styled(ProductContainer)`
	display: grid;
	grid-template-columns: 500px auto;
	gap: 35px;
	margin-top: 40px;

	.product-content {
		display: flex;
		flex-direction: column;
		row-gap: 24px;
		width: 100%;
	}

	.product-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 30px;
	}

	.product-line {
		width: 100%;
		height: 1px;
		background-color: #fff;
	}

	.product-id {
		max-width: max-content;
		margin-left: auto;
	}
`;
