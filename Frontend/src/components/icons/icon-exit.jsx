import styled from 'styled-components';

const IconExitContainer = ({ className }) => (
	<span className={className}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M11.9399 12H21.6899" stroke="white" />
			<path
				d="M17.9473 18.75V21H5.94727V3H17.9473V5.25H19.4473V2.25C19.4473 2.05109 19.3682 1.86032 19.2276 1.71967C19.0869 1.57902 18.8962 1.5 18.6973 1.5H5.19727C4.99835 1.5 4.80759 1.57902 4.66694 1.71967C4.52628 1.86032 4.44727 2.05109 4.44727 2.25V21.75C4.44727 21.9489 4.52628 22.1397 4.66694 22.2803C4.80759 22.421 4.99835 22.5 5.19727 22.5H18.6973C18.8962 22.5 19.0869 22.421 19.2276 22.2803C19.3682 22.1397 19.4473 21.9489 19.4473 21.75V18.75H17.9473Z"
				fill="white"
			/>
			<path d="M21.6899 12L18.6899 15" stroke="white" />
			<path d="M21.6899 12L18.6899 9" stroke="white" />
		</svg>
	</span>
);

export const IconExit = styled(IconExitContainer)``;
