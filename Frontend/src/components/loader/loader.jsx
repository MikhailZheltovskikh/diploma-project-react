import styled from 'styled-components';

const loaderContainer = ({ className }) => <div className={className}></div>;

export const Loader = styled(loaderContainer)`
	margin: 50px auto;
	width: 50px;
	height: 50px;
	border: 5px solid #fff;
	border-radius: 50%;
	border-left-color: transparent;
	animation: loader 1s infinite;

	@keyframes loader{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
