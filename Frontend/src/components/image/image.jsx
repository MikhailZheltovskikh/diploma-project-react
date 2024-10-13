import PropType from 'prop-types';
import styled from 'styled-components';

const ImageContainer = ({ className, children, width, height }) => (
	<div className={className}>{children}</div>
);

export const Image = styled(ImageContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	padding: 15px;
	width: ${({ width = '200px' }) => width};
	height: ${({ height = '200px' }) => height};
	border-radius: 35px;
	background-color: #fff;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

Image.propTypes = {
	children: PropType.node.isRequired,
	width: PropType.string,
	height: PropType.string,
};
