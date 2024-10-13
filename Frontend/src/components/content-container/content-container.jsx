import PropType from 'prop-types'
import styled from 'styled-components';

const ContentContainerContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const ContentContainer = styled(ContentContainerContainer)`
	max-width: 1224px;
	width: 100%;
	padding: 0 10px;
	margin: 0 auto;
`;

ContentContainer.propTypes = {
	children: PropType.node.isRequired,
};