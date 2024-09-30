import { Content, ContentContainer, H2, H3, PrivateContent } from '../../components';
import { TabelRow, UserRole } from './ui';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ROLE } from '../../constans';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<Content error={errorMessage}>
					<ContentContainer>
						<H2>Пользователи</H2>
						<div className="tabel">
							<TabelRow>
								<H3 className="login-column">Логин</H3>
								<H3 className="registed-at-column">Дата регистрации</H3>
								<H3 className="role-column ">Роль</H3>
							</TabelRow>

							{users.map(({ id, login, registeredAt, roleId }) => (
								<UserRole
									key={id}
									id={id}
									login={login}
									registeredAt={registeredAt}
									roleId={roleId}
									roles={roles.filter(
										({ id: roleId }) => roleId !== ROLE.GUEST,
									)}
									onUserRemove={() => onUserRemove(id)}
								/>
							))}
						</div>
					</ContentContainer>
				</Content>
			</div>
		</PrivateContent>
	);
};

export const User = styled(UsersContainer)`
	.tabel {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	.login-column {
		width: 300px;
		flex-shrink: 0;
	}

	.registed-at-column {
		width: 500px;
		text-align: center;
		flex-shrink: 0;
	}

	.role-column {
		width: 100%;
		display: flex;
		align-items: center;
		column-gap: 10px;
		justify-content: space-between;
	}
`;
