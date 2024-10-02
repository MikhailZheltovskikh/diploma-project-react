import { Route, Routes } from 'react-router-dom';
import { Header, Modal } from './components';
import { Authorization, Registration, Main, User, Product, ProductsEdit, Catalog, Cart, GroupsEdit } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { setUser } from './redux/action';



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

	useLayoutEffect(() => {
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
	}, [dispatch]);

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
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Modal/>
		</Wrapper>
	);
};
