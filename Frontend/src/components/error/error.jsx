import PropType from 'prop-types'
import { H2 } from '../H2/H2';
import { TextBlock } from '../text-block/text-block';
import styled from 'styled-components';

const ErrorContainer = ({ className, error }) =>
	error && (
		<div className={className}>
			<H2>Ошибка</H2>
			<TextBlock>{error}</TextBlock>
		</div>
	);

export const Error = styled(ErrorContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

Error.propTypes = {
	error: PropType.string.isRequired,
};