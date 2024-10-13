import styled from 'styled-components';
import {
	ButtonIcon,
	H2,
	H3,
	IconDelete,
	IconInc,
	Image,
	TextBlock,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	removeProductToCart,
	minusProductToCart,
	removeProductToCartAsync,
	updateProductToCartAsync,
	openModal,
	CLOSE_MODAL,
} from '../../../../redux/action';
import { IconDecr } from '../../../../components/icons/icon-decr';
import { selectCart, selectUserId } from '../../../../redux/selectors';

const ProductCardContainer = ({ className, id, title, price, image_url }) => {
	const dispatch = useDispatch();

	const { cart } = useSelector(selectCart);
	const userId = useSelector(selectUserId);

	const cartItem = cart.find((item) => item.id === id);
	const addedCount = cartItem ? cartItem.count : 0;

	const removeItem = () => {
		dispatch(
			openModal({
				text: 'Удалить выбранный товар?',
				onConfirm: () => {
					if (userId) {
						dispatch(removeProductToCartAsync(id));
					} else {
						dispatch(removeProductToCart(id));
					}
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const onClickPlus = () => {
		if (userId) {
			dispatch(updateProductToCartAsync({ id }, 'inc'));
		} else {
			dispatch(addProductToCart({ id }));
		}
	};

	const onClickMinus = () => {
		if (addedCount > 1) {
			if (userId) {
				dispatch(updateProductToCartAsync({ id }, 'dec'));
			} else {
				dispatch(minusProductToCart({ id }));
			}
		}
	};

	return (
		<div className={className}>
			<Image width="200px" height="140px">
				<img src={image_url} alt={title} />
			</Image>
			<div className="product-card__content">
				<div className="product-card__top">
					<H3>{title}</H3>
					<div className="control">
						<ButtonIcon onClick={onClickPlus}>
							<IconInc />
						</ButtonIcon>
						<TextBlock>{addedCount} шт</TextBlock>
						<ButtonIcon disabled={addedCount <= 1} onClick={onClickMinus}>
							<IconDecr />
						</ButtonIcon>
						<ButtonIcon onClick={removeItem}>
							<IconDelete />
						</ButtonIcon>
					</div>
				</div>

				<div className="product-card__line"></div>
				<div className="product-card__box">
					<TextBlock>Id товара: {id}</TextBlock>
					<H2 color="#FFCC00">{price}₽</H2>
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

	.control {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}
`;
