import styled from 'styled-components';
import { ContentContainer, H1, H2 } from '../../components';

const notFoundContainer = ({ className }) => {
	return (
		<div className={className}>
			<ContentContainer>
				<H1>404</H1>
				<H2 className="text">Такой страницы не существует</H2>
			</ContentContainer>
		</div>
	);
};

export const NotFound = styled(notFoundContainer)`
	margin-top: 200px;

	.text {
		margin-top: 20px;
	}
`;
