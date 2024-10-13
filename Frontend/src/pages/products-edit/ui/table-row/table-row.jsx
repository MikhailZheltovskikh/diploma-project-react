import PropType from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: grid;
	grid-template-columns: 60px 200px 130px auto 100px 100px 70px 130px;
	column-gap: 15px;
`;

TableRow.propTypes = {
	children: PropType.node.isRequired,
};
