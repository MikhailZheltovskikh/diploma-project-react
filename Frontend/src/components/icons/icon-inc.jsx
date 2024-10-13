import styled from 'styled-components';

const IconIncContainer = ({ className }) => (
	<span className={className}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="24" height="24" rx="12" fill="#FFCC00" />
			<path
				d="M12.75 6H11.25V11.25H6V12.75H11.25V18H12.75V12.75H18V11.25H12.75V6Z"
				fill="black"
			/>
		</svg>
	</span>
);

export const IconInc = styled(IconIncContainer)``;
