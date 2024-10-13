import PropType from 'prop-types'
import styled from 'styled-components';

const H2Container = ({ children, className, color }) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Container)`
	text-align: center;
	font-size: 30px;
	line-height: normal;
	font-weight: 700;
	color: ${({ color = '#fff' }) => color };
`;

H2.propTypes = {
	children: PropType.node.isRequired,
	color: PropType.string,
};