import PropType from 'prop-types'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonIconLinkContainer = ({ className, children, ...props }) => {
	return (
		<Link className={className} {...props}>
			{children}
		</Link>
	);
};

export const ButtonIconLink = styled(ButtonIconLinkContainer)`
	&:hover {
		opacity: 0.7;
	}
`;

ButtonIconLink.propTypes = {
	children: PropType.node.isRequired,
};