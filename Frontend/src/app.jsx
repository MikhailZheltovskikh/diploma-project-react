import { Route, Routes } from 'react-router-dom';
import { ErrorModal, Header, Modal } from './components';
import {
	Authorization,
	Registration,
	Main,
	User,
	Product,
	ProductsEdit,
	Catalog,
	Cart,
	GroupsEdit,
	NotFound,
} from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { getProductToCartAsync, setProductToCart, setUser } from './redux/action';
import { selectUserId } from './redux/selectors';

const Wrapper = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

const Page = styled.div`
	flex: 1 1 auto;
`;

export const App = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	useLayoutEffect(() => {
		if (userId) {
			dispatch(getProductToCartAsync());
		} else {
			const currentCartDataJSON = localStorage.getItem('cart');
			if(!currentCartDataJSON){
				localStorage.setItem('cart', JSON.stringify({ cart: [], totalPrice: 0 }));
			}
			const currentCartData = JSON.parse(currentCartDataJSON);

			dispatch(
				setProductToCart({
					cart: currentCartData.cart,
					totalPrice: Number(currentCartData.totalPrice),
				}),
			);
		}

		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch, userId]);

	return (
		<Wrapper>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/catalog/:id" element={<Catalog />} />
					<Route path="/buy" element={<div>Корзина</div>} />
					<Route path="/users" element={<User />} />
					<Route path="/products-edit" element={<ProductsEdit />} />
					<Route path="/groups-edit" element={<GroupsEdit />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound/>} />
					<Route path="/404" element={<NotFound/>} />
				</Routes>
			</Page>
			<Modal />
			<ErrorModal />

		</Wrapper>
	);
};
