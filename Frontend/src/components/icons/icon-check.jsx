import styled from 'styled-components';

const IconCheckContainer = ({ className }) => (
	<span className={className}>
		<svg
			width="60"
			height="50"
			viewBox="0 0 60 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="60" height="50" rx="25" fill="#FFCC00" />
			<path
				d="M18 26L20.5 23.5L26.75 29.75L40.5 16L43 18.5L26.75 34.75L18 26Z"
				fill="black"
			/>
		</svg>
	</span>
);

export const IconCheck = styled(IconCheckContainer)``;
