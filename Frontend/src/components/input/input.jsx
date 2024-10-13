import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	display: block;
	width: 100%;
	height: 50px;
	padding: 0 5px 0 14px;
	font-size: 16px;
	line-height: 120%;
	font-weight: 400;
	color: #000000;
	border-radius: 25px;
	border: none;
	background-color: #fff;

	&::placeholder {
		color: #000000;
	}
`;