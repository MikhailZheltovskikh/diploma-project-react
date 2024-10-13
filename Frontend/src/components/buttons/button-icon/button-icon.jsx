import PropType from 'prop-types'
import styled from 'styled-components';

const ButtonIconContainer = ({ className, children, maxWidth, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const ButtonIcon = styled(ButtonIconContainer)`
	padding: 0;
	background: transparent;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;
	opacity: ${({ disabled }) => (disabled ? '.5' : '1')};

	&:hover {
		opacity: 0.7;
	}

`;

ButtonIcon.propTypes = {
	children: PropType.object.isRequired,
	maxWidth: PropType.string,
};
