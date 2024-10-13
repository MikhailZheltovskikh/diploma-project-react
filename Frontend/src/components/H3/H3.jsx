import PropType from 'prop-types'
import styled from 'styled-components';

const H3Container = ({ children, className }) => (
	<h3 className={className}>{children}</h3>
);

export const H3 = styled(H3Container)`
	font-size: 22px;
	line-height: 1;
	font-weight: 700;
	color: #ffffff;
`;

H3.propTypes = {
	children: PropType.node,
};