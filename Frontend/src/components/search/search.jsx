import { Input } from '../input/input';
import styled from 'styled-components';

const SearchContainer = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<div className="search__box">
				<Input type="text" onChange={onChange} value={searchPhrase} placeholder="Поиск по заголовкам..." />
				<button></button>
			</div>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	.search__box {
		position: relative;
		margin-bottom: 20px;
	}

	.search__box button {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		padding: 0;
		width: 21px;
		height: 21px;
		border: none;
		background: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.3956 17.4795L15.3485 12.4319C14.5964 13.6015 13.6012 14.5963 12.4316 15.3483L17.4792 20.3959C18.285 21.2015 19.5915 21.2015 20.3956 20.3959C21.2014 19.5916 21.2014 18.2851 20.3956 17.4795Z' fill='%23FFCC00'/%3E%3Cpath d='M16.4999 8.25001C16.4999 3.69406 12.8061 0 8.25001 0C3.69406 0 0 3.69406 0 8.25001C0 12.806 3.69406 16.4998 8.25001 16.4998C12.8061 16.4998 16.4999 12.806 16.4999 8.25001ZM8.25001 14.4373C4.83802 14.4373 2.06256 11.6621 2.06256 8.25006C2.06256 4.83806 4.83802 2.06261 8.25001 2.06261C11.6619 2.06261 14.4376 4.83806 14.4376 8.25006C14.4376 11.6621 11.6619 14.4373 8.25001 14.4373Z' fill='%23FFCC00'/%3E%3C/svg%3E%0A")
			center/auto no-repeat;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.search__box button:hover {
		opacity: 0.7;
	}
`;
