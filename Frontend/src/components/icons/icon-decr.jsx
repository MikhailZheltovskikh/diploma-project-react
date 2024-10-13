import styled from 'styled-components';

const IconDecrContainer = ({ className }) => (
	<span className={className}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="24" height="24" rx="12" fill="#FFCC00" />
			<path d="M18 11H6V12H18V11Z" fill="black" />
		</svg>
	</span>
);

export const IconDecr = styled(IconDecrContainer)``;
