import styled from 'styled-components';
import { H3 } from '../H3/H3';
import { Button } from '../buttons';
import { TextBlock } from '../text-block/text-block';
import { SORT } from '../../constans';

const FilterContainer = ({ className, setPriceSort }) => {

	return (
		<div className={className}>
			<H3>Функции сортировки</H3>
			<div className="filter-items">
				<div className="filter-item">
					<TextBlock>По стоимости</TextBlock>
					<ul className="filter-item-list">
						<li>
							<Button
								onClick={() => {
									setPriceSort(SORT.ASK);
								}}
							>
								По возрастанию
							</Button>
						</li>
						<li>
							<Button
								onClick={() => {
									setPriceSort(SORT.DESK);
								}}
							>
								По убыванию
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export const Filter = styled(FilterContainer)`
	border: 1px solid #000000;
	border-radius: 25px;
	display: flex;
	align-items: center;
	padding: 0 0 0 20px;
	margin-bottom: 20px;

	.filter-items {
		max-width: max-content;
		margin-left: auto;
	}

	.filter-item {
		position: relative;
		height: 50px;
		width: 220px;
		padding: 0 20px;
		background: #000000;
		border-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		cursor: pointer;
	}

	.filter-item:hover {
		border-radius: 25px 25px 0 0;
	}

	.filter-item:after {
		content: '';
		position: relative;
		width: 7px;
		height: 5px;
		background: url("data:image/svg+xml,%3Csvg width='7' height='5' viewBox='0 0 7 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5L7 0.833334C7 0.833334 7 1.43051e-06 6.3 9.52175e-07L3.5 3.33333L0.699999 9.40181e-07C-1.17223e-06 9.38682e-07 -6.58968e-07 0.833334 -6.58968e-07 0.833334L3.5 5Z' fill='%23FFCC00'/%3E%3C/svg%3E%0A")
			center/auto no-repeat;
		transition: all 0.2s ease;
	}

	.filter-item:hover:after {
		transform: rotate(180deg);
	}

	.filter-item-list {
		position: absolute;
		top: 100%;
		right: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		margin: 0 !important;
		padding: 10px !important;
		list-style: none;
		background: #000;
		border-radius: 0 0 25px 25px;
		box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
		visibility: hidden;
		opacity: 0;
		z-index: -1;
		transition: all 0.2s ease;
	}

	.filter-item:hover .filter-item-list {
		visibility: visible;
		opacity: 1;
		z-index: 2;
	}
`;
