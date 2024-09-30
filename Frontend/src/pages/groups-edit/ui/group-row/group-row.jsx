import { useState } from 'react';
import { ButtonIcon, IconCheck, IconDeleteBig, Input } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';

const GroupRowContainer = ({ className, id, name, editGroupOnSave, onGroupRemove }) => {
	const [nameValue, setNameValue] = useState(name);
	const onNameChange = ({ target }) => setNameValue(target.value);

	const isSaveBtnDisabled = nameValue === name;

	const saveGroupData = {
		id,
		name: nameValue,
	};

	return (
		<div className={className}>
			<TableRow>
				<div className="text-id">{id}</div>
				<Input
					onChange={onNameChange}
					value={nameValue}
					placeholder="Наименование"
				/>
				<div className="buttons-box">
					<ButtonIcon
						disabled={isSaveBtnDisabled}
						onClick={() => editGroupOnSave(saveGroupData)}
					>
						<IconCheck />
					</ButtonIcon>
					<ButtonIcon onClick={onGroupRemove}>
						<IconDeleteBig />
					</ButtonIcon>
				</div>
			</TableRow>
		</div>
	);
};

export const GroupRow = styled(GroupRowContainer)`
	.text-id {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		font-size: 16px;
		line-height: 120%;
		font-weight: 400;
		color: #000000;
		border-radius: 25px;
		background-color: #fff;
		overflow: hidden;
	}

	.buttons-box {
		display: flex;
		justify-content: space-between;
		gap: 5px;
		align-items: center;
	}

	& select {
		display: block;
		width: 100%;
		height: 50px;
		padding: 0 5px 0 14px;
		font-size: 16px;
		line-height: 120%;
		font-weight: 400;
		color: #000000;
		border-radius: 25px;
		border: none;
		background-color: #fff;
	}
	& select::placeholder {
		color: #000000;
	}
`;
