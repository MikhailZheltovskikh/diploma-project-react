import { useEffect, useState } from 'react';
import {
	Button,
	ButtonIcon,
	H2,
	IconClose,
	Input,
	TextBlock,
} from '../../../../components';
import { CreateRow } from './ui';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const CreateProductContainer = ({ className, handleCloseModal, createHandleSubmit }) => {
	const requestServer = useServerRequest();
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		requestServer('fetchGroups').then((groupsRes) => {
			setGroups(groupsRes.res);
		});
	}, [requestServer]);

	const [titleValue, setTitleValue] = useState('');
	const [groupValue, setGroupValue] = useState('01');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [priceValue, setPriceValue] = useState('');
	const [imageUrlValue, setImageUrlValue] = useState('');
	const [amountValue, setAmountValue] = useState('');

	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onGroupChange = ({ target }) => setGroupValue(target.value);
	const onDescriptionChange = ({ target }) => setDescriptionValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onAmountChange = ({ target }) => setAmountValue(target.value);
	const onImageUrlChange = ({ target }) => setImageUrlValue(target.value);

	const saveProductData = {
		id: '',
		title: titleValue,
		group: groupValue,
		description: descriptionValue,
		price: priceValue,
		image_url: imageUrlValue,
		amount: amountValue,
	};

	return (
		<div className={className}>
			<div className="owerlay">
				<H2 className="title">Новый товар</H2>
				<div className="form">
					<CreateRow>
						<TextBlock className="item-title">Наименование</TextBlock>
						<Input
							value={titleValue}
							className="item-input"
							placeholder="Наименование"
							name="title"
							onChange={onTitleChange}
						/>
					</CreateRow>
					<CreateRow>
						<TextBlock className="item-title">Категория</TextBlock>
						<select value={groupValue} onChange={onGroupChange}>
							{groups.map(({ id: groupsID, name: groupsName }) => (
								<option key={groupsID} value={groupsID}>
									{groupsName}
								</option>
							))}
						</select>
					</CreateRow>
					<CreateRow>
						<TextBlock className="item-title">Описание</TextBlock>
						<Input
							value={descriptionValue}
							className="item-input"
							placeholder="Описание"
							name="description"
							onChange={onDescriptionChange}
						/>
					</CreateRow>
					<CreateRow>
						<TextBlock className="item-title">Фото</TextBlock>
						<Input
							value={imageUrlValue}
							className="item-input"
							placeholder="Фото"
							name="imageUrl"
							onChange={onImageUrlChange}
						/>
					</CreateRow>
					<CreateRow>
						<TextBlock className="item-title">Стоимость</TextBlock>
						<Input
							value={priceValue}
							className="item-input"
							placeholder="Стоимость"
							name="price"
							onChange={onPriceChange}
						/>
					</CreateRow>
					<CreateRow>
						<TextBlock className="item-title">Кол-во</TextBlock>
						<Input
							value={amountValue}
							className="item-input"
							placeholder="Кол-во"
							name="amount"
							onChange={onAmountChange}
						/>
					</CreateRow>
					<Button
						maxWidth="220px"
						margin="0 auto"
						onClick={() =>
							createHandleSubmit(saveProductData)
						}
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

export const CreateProduct = styled(CreateProductContainer)`
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
