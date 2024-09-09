import { IconDelete, IconSave, ButtonIcon } from '../../../../components';
import styled from 'styled-components';
import { TabelRow } from '../table-row/table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';

const UserRoleContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveBtnDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TabelRow>
				<div className="login-column">{login}</div>
				<div className="registed-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<ButtonIcon
						disabled={isSaveBtnDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					>
						<IconSave />
					</ButtonIcon>
				</div>
			</TabelRow>
			<div className="user-data">
				<ButtonIcon onClick={onUserRemove}>
					<IconDelete />
				</ButtonIcon>
			</div>
		</div>
	);
};

export const UserRole = styled(UserRoleContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	width: 100%;
	background: #fff;
	padding: 5px;
	border-radius: 8px;

	select {
		width: 100%;
		height: 35px;
		padding: 0 15px;
		border-radius: 0;
	}
`;
