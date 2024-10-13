import PropType from 'prop-types';
import styled from 'styled-components';

const CreateRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const CreateRow = styled(CreateRowContainer)`
	display: grid;
	grid-template-columns: 130px auto;
	column-gap: 15px;
`;

CreateRow.propTypes = {
	children: PropType.node.isRequired,
};
