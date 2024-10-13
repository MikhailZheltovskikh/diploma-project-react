import PropType from 'prop-types'
import styled from 'styled-components';

const TabelRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TabelRow = styled(TabelRowContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

TabelRow.propTypes = {
	children: PropType.node.isRequired,
};