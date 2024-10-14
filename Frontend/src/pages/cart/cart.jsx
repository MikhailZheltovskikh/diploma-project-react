import styled from 'styled-components';
import {
	AsideBlock,
	Button,
	ButtonLink,
	ContentContainer,
	H2,
	H3,
	TextBlock,
} from '../../components';
import { ProductCard } from './ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectUserId } from '../../redux/selectors';
import {
	clearProductToCart,
	clearProductToCartAsync,
	CLOSE_MODAL,
	openModal,
} from '../../redux/action';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	const { cart, totalPrice } = useSelector(selectCart);

	if (cart.length <= 0) {
		return (
			<div className={className}>
				<H2>Корзина</H2>
				<H3 className="subtitle">Корзина пуста</H3>
			</div>
		);
	}

	const hendelClearCart = () => {
		dispatch(
			openModal({
				text: 'Вы действительно хотите очистить корзину?',
				onConfirm: () => {
					if (userId) {
						dispatch(clearProductToCartAsync());
					} else {
						dispatch(clearProductToCart());
					}
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<ContentContainer>
				<H2>Корзина</H2>
				{cart.length > 1 && (
					<Button
						onClick={hendelClearCart}
						maxWidth="200px"
						margin="10px 0 0 auto"
					>
						Очистить корзину
					</Button>
				)}

				<div className="basekt">
					<div className="basekt-content">
						{cart.map(({ id, title, image_url, price }) => (
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
							{cart.length} товар(а)
						</TextBlock>
						<div className="aside__line"></div>
						<div className="aside__price-box">
							<TextBlock color="#000" className="aside__price-title">
								Итого:
							</TextBlock>
							<H2 color="#FFCC00" className="basekt-aside__price">
								{totalPrice}₽
							</H2>
						</div>
						{userId ? (
							<Button className="basekt-aside__order">
								Оформить заказ
							</Button>
						) : (
							<div className="btn-block">
								<TextBlock color="#000">
									Войдите, что бы оформить заказ
								</TextBlock>
								<ButtonLink to="/login">Вход</ButtonLink>
							</div>
						)}
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
		margin-bottom: 20px;
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

	.subtitle {
		text-align: center;
		margin-top: 20px;
	}

	.btn-block {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		align-items: center;
		padding: 0 10px;
		text-align: center;
	}
`;
