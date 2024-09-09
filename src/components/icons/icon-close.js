import styled from 'styled-components';

const IconCloseContainer = ({ className }) => (
	<span className={className}>
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="40" height="40" rx="20" fill="#FFCC00" />
			<line
				y1="-0.5"
				x2="16.4791"
				y2="-0.5"
				transform="matrix(0.728195 0.68537 -0.728195 0.68537 14 14.7058)"
				stroke="black"
			/>
			<line
				y1="-0.5"
				x2="16.4791"
				y2="-0.5"
				transform="matrix(-0.728195 0.68537 -0.728195 -0.68537 26.0005 14)"
				stroke="black"
			/>
		</svg>
	</span>
);

export const IconClose = styled(IconCloseContainer)``;
