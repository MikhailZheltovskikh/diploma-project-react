import PropType from 'prop-types';
import { useState } from 'react';
import {
	Button,
	ButtonIcon,
	H2,
	IconClose,
	Input,
	TextBlock,
} from '../../../../components';
import { CreateRow } from './ui';

import styled from 'styled-components';

const CreateGroupContainer = ({ className, handleCloseModal, createHandleSubmit }) => {
	const [nameValue, setNameValue] = useState('');

	const onNameChange = ({ target }) => setNameValue(target.value);

	const saveProductData = {
		id: '',
		name: nameValue,
	};

	return (
		<div className={className}>
			<div className="owerlay">
				<H2 className="title">Новая группа</H2>
				<div className="form">
					<CreateRow>
						<TextBlock className="item-title">Название</TextBlock>
						<Input
							value={nameValue}
							className="item-input"
							placeholder="Введите название группы"
							name="title"
							onChange={onNameChange}
						/>
					</CreateRow>
					<Button
						maxWidth="220px"
						margin="0 auto"
						onClick={() => createHandleSubmit(saveProductData)}
					>
						Добавить
					</Button>
				</div>
				<ButtonIcon className="close" onClick={handleCloseModal}>
					<IconClose />
				</ButtonIcon>
			</div>
		</div>
	);
};

export const CreateGroup = styled(CreateGroupContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.9);
	z-index: 2;

	& .title {
		color: #000;
	}

	& .form {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		width: 100%;
	}

	& .item-title {
		display: flex;
		align-items: center;
		padding-left: 10px;
		height: 50px;
		color: #000;
		border: 1px solid #000;
		border-radius: 5px;
	}

	& .item-input {
		border-radius: 5px;
		border: 1px solid #000;
	}

	& .owerlay {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 20px;
		text-align: center;
		background: #fff;
		padding: 40px 20px;
		border-radius: 20px;
		max-width: 800px;
		width: 100%;
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
		border: 1px solid #000;
		border-radius: 5px;
		background-color: #fff;
	}

	& select::placeholder {
		color: #000000;
	}

	& .close {
		position: absolute;
		top: 20px;
		right: 20px;
	}
`;

CreateGroup.propTypes = {
	handleCloseModal: PropType.func.isRequired,
	createHandleSubmit: PropType.func.isRequired,
};
