import { ContentContainer, H2, H3, Loader, PrivateContent } from '../../components';
import { TabelRow, UserRole } from './ui';
import { useEffect } from 'react';
import { ROLE } from '../../constans';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, selectUsers } from '../../redux/selectors';
import { editUserAsync, getUsersAsync, removeUserAsync } from '../../redux/action';
import styled from 'styled-components';
import { CLOSE_MODAL, openModal } from '../../redux/action';

const UsersContainer = ({ className }) => {
	const dispatch = useDispatch();

	const { users, roles, isLoading, error } = useSelector(selectUsers);
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		if (roleId === ROLE.ADMIN) {
			dispatch(getUsersAsync());
		}
	}, [dispatch, roleId]);

	const onUserRemove = (userId) => {
		dispatch(
			openModal({
				text: 'Удалить пользователя?',
				onConfirm: () => {
					dispatch(removeUserAsync(userId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const onRoleSave = (saveUserData) => {
		dispatch(
			openModal({
				text: 'Сохранить изменения?',
				onConfirm: () => {
					dispatch(editUserAsync(saveUserData));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
			<div className={className}>
				<ContentContainer>
					<H2>Пользователи</H2>
					{isLoading ? (
						<Loader />
					) : (
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
									roles={roles}
									initialRoleId={roleId}
									onRoleSave={onRoleSave}
									onUserRemove={() => onUserRemove(id)}
								/>
							))}
						</div>
					)}
				</ContentContainer>
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
