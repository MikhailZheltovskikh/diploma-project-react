import styled from 'styled-components';

const H1Container = ({ children, className, color }) => (
	<h1 className={className}>{children}</h1>
);

export const H1 = styled(H1Container)`
	text-align: center;
	font-size: 90px;
	line-height: normal;
	font-weight: 700;
	color: ${({ color = '#fff' }) => color };
`;
