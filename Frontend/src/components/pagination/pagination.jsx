import PropType from 'prop-types';
import { Button, TextBlock } from '..';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<TextBlock className="current-page">Страница: {page}</TextBlock>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 50px 0 20px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 100%;
		font-size: 18px;
		font-weight: 500;
	}
`;

Pagination.propTypes = {
	page: PropType.number,
	setPage: PropType.func,
	lastPage: PropType.number,
};
