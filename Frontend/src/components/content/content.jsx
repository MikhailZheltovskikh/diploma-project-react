import { H2 } from '../H2/H2';
import { TextBlock } from '../text-block/text-block';
import styled from 'styled-components';

const ContentContainer = ({ className, children, error }) =>
	error ? (
		<div className={className}>
			<H2>Ошибка</H2>
			<TextBlock>{error}</TextBlock>
		</div>
	) : (
		children
	);

export const Content = styled(ContentContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;
