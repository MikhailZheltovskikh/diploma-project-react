import { useDispatch, useSelector } from 'react-redux';
import { selectModalError } from '../../redux/selectors';
import { TextBlock } from '../text-block/text-block';
import styled from 'styled-components';
import { useEffect } from 'react';
import { closeModalError } from '../../redux/action';

const ErrorModalContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { isOpen, error } = useSelector(selectModalError);

	useEffect(() => {
		let timeId;
		if (isOpen) {
			timeId = setTimeout(() => {
				dispatch(closeModalError);
			}, 3000);
		}
		return () => {
			if (timeId) {
				clearTimeout(timeId);
			}
		};
	}, [isOpen, dispatch]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<TextBlock>{error}</TextBlock>
		</div>
	);
};
export const ErrorModal = styled(ErrorModalContainer)`
	display: flex;
	position: fixed;
	right: 0;
	max-width: 300px;
	background: #f86767de;
	padding: 20px;
`;
