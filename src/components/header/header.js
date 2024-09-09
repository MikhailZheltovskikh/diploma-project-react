import { AdminPanel, Logo } from './ui';
import {
	ButtonIcon,
	ButtonLink,
	ContentContainer,
	IconBasket,
	IconExit,
} from '../../components';
import { ROLE } from '../../constans';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserRole, selectUserSession, selectUserLogin } from '../../selectors';
import { logout } from '../../action';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
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
						<ButtonIcon>
							<IconBasket />
						</ButtonIcon>
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
`;
