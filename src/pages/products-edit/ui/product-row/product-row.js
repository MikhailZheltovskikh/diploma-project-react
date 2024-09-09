import { useState } from 'react';
import { ButtonIcon, IconCheck, IconDeleteBig, Input } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';

const ProductRowContainer = ({
	className,
	id,
	title,
	group: groupID,
	groups,
	image_url,
	description,
	price,
	amount,
	onProductsRemove,
	editProductOnSave,
}) => {
	const [titleValue, setTitleValue] = useState(title);
	const [groupValue, setGroupValue] = useState(groupID);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [priceValue, setPriceValue] = useState(price);
	const [imageUrlValue, setImageUrlValue] = useState(image_url);
	const [amountValue, setAmountValue] = useState(amount);

	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onGroupChange = ({ target }) => setGroupValue(target.value);
	const onDescriptionChange = ({ target }) => setDescriptionValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onAmountChange = ({ target }) => setAmountValue(target.value);
	const onImageUrlChange = ({ target }) => setImageUrlValue(target.value);

	const isSaveBtnDisabled =
		titleValue === title &&
		groupValue === groupID &&
		descriptionValue === description &&
		priceValue === price &&
		imageUrlValue === image_url &&
		amountValue === amount;

	const saveProductData = {
		id,
		title: titleValue,
		group: groupValue,
		description: descriptionValue,
		price: priceValue,
		image_url: imageUrlValue,
		amount: amountValue,
	};

	return (
		<div className={className}>
			<TableRow>
				<div className="text-id">{id}</div>
				<Input
					onChange={onTitleChange}
					value={titleValue}
					placeholder="Наименование"
				/>
				<select value={groupValue} onChange={onGroupChange}>
					{groups.map(({ id: groupsID, name: groupsName }) => (
						<option key={groupsID} value={groupsID}>
							{groupsName}
						</option>
					))}
				</select>
				<Input
					onChange={onDescriptionChange}
					value={descriptionValue}
					placeholder="Описание"
				/>
				<Input
					onChange={onPriceChange}
					value={priceValue}
					placeholder="Стоимость"
				/>
				<Input
					onChange={onImageUrlChange}
					value={imageUrlValue}
					placeholder="Фото"
				/>
				<Input
					onChange={onAmountChange}
					value={amountValue}
					placeholder="Кол-во"
				/>
				<div className="buttons-box">
					<ButtonIcon
						disabled={isSaveBtnDisabled}
						onClick={() => editProductOnSave(saveProductData)}
					>
						<IconCheck />
					</ButtonIcon>
					<ButtonIcon onClick={onProductsRemove}>
						<IconDeleteBig />
					</ButtonIcon>
				</div>
			</TableRow>
		</div>
	);
};

export const ProductRow = styled(ProductRowContainer)`
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
