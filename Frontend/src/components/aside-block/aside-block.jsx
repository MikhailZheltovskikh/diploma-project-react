import PropType from 'prop-types'
import { H3 } from '../H3/H3';
import styled from 'styled-components';

const AsideBlockContainer = ({ className, title, children }) => (
	<div className={className}>
		<H3>{title}</H3>
		{children}
	</div>
);

export const AsideBlock = styled(AsideBlockContainer)`
	padding-bottom: 30px;
	background-color: #fff;
	border: 2px solid #ffffff;
	border-radius: 35px;
	height: max-content;

	H3 {
		height: 70px;
		display: flex;
		align-items: center;
		padding-left: 40px;
		background-color: #737373;
		border-radius: 35px;
	}
`;

AsideBlock.propTypes = {
	children: PropType.node.isRequired,
	title: PropType.string.isRequired,
}