import { useSelector } from 'react-redux';
import { H2 } from '../H2/H2';
import { Button } from '../buttons';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../redux/selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay">
				<H2 className="title">{text}</H2>
				<div className="buttons">
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.9);
	z-index: 100;

	& .title {
		color: #000;
	}

	& .overlay {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 20px;
		text-align: center;
		background: #fff;
		padding: 40px 20px;
		border-radius: 20px;
		max-width: 500px;
		width: 100%;
	}

	& .buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		max-width: 300px;
		width: 100%;
	}
`;
