import styled from 'styled-components';

const TextBlockContainer = ({ children, className, color }) => (
	<div className={className}>{children}</div>
);

export const TextBlock = styled(TextBlockContainer)`
	font-size: 16px;
	line-height: 120%;
	font-weight: 400;
	color: ${({ color = '#ffffff' }) => color};
`;
