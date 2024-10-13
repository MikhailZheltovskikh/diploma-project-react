import { AdminPanel, Logo } from './ui';
import {
	ButtonIcon,
	ButtonIconLink,
	ButtonLink,
	ContentContainer,
	IconBasket,
	IconExit,
} from '..';

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import { selectCart, selectUserLogin, selectUserRole } from '../../redux/selectors';
import { logout } from '../../redux/action';
import { ROLE } from '../../constans';

const HeaderContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const { cart } = useSelector(selectCart);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	return (
		<header className={className}>
			<ContentContainer>
				<div className="header__inner">
					<div className="logo">
						<Logo />
						<div className="logo-desc">
							Магазин цифровой и бытовой техники
						</div>
					</div>
					<div className="header-buttons">
						<ButtonIconLink to={'/cart'} className="cart">
							<IconBasket />
							{cart && cart.length > 0 && (
								<span className="amount">{cart.length}</span>
							)}
						</ButtonIconLink>
						{roleId === ROLE.GUEST ? (
							<ButtonLink to="/login">Вход</ButtonLink>
						) : (
							<div className="header-box">
								<div className="header-user">
									<div>{login}</div>
									<ButtonIcon onClick={onLogout}>
										<IconExit />
									</ButtonIcon>
								</div>
								{roleId === ROLE.ADMIN && <AdminPanel />}
							</div>
						)}
					</div>
				</div>
			</ContentContainer>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	padding: 30px 0;

	.header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: 20px;
	}

	.logo {
		display: flex;
		align-items: center;
		column-gap: 20px;
	}

	.logo-desc {
		font-size: 16px;
		line-height: normal;
		font-weight: 400;
		color: #ffffff;
	}

	.header-box {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	.header-user {
		display: flex;
		align-items: center;
		column-gap: 10px;
		font-size: 18px;
		line-height: normal;
		font-weight: 400;
		color: #fff;
	}

	.header-buttons {
		display: flex;
		align-items: center;
		column-gap: 30px;
	}

	.cart {
		position: relative;
	}

	.cart span.amount {
		position: absolute;
		top: -5px;
		right: -5px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		font-size: 12px;
		color: #000 !important;
		background: #fff;
		border-radius: 50%;
	}
`;
