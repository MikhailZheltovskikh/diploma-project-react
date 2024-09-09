import image from '../../../../images/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = ({ className }) => (
	<Link to="/" className={className}>
		<img src={image} alt="" />
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: block;
`;
