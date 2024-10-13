import styled from 'styled-components';

const ButtonContainer = ({
	className,
	children,
	maxWidth,
	margin,
	disabled,
	...props
}) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: block;
	padding: 16px 30px;
	margin: ${({ margin = '0' }) => margin};
	width: 100%;
	max-width: ${({ maxWidth = '100%' }) => maxWidth};
	font-size: 16px;
	line-height: 1;
	font-weight: 400;
	color: #2a2a2a;
	background-color: #ffcc00;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	transition: all 0.2s ease;
	opacity: ${({ disabled }) => (disabled ? '.5' : '1')};

	&:hover {
		opacity: 0.7;
	}
`;
