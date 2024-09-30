import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonLinkContainer = ({ className, children, ...props }) => {
	return <Link className={className} {...props}>{children}</Link>;
};

export const ButtonLink = styled(ButtonLinkContainer)`
	padding: 16px 30px;
	font-size: 16px;
	line-height: 16px;
	font-weight: 400;
	color: #2a2a2a !important;
	background-color: #ffcc00;
	border: none;
	border-radius: 25px;
	text-decoration: none;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		opacity: 0.7;
	}
`;
