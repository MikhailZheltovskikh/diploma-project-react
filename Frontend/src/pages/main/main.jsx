import { useEffect, useMemo, useState } from 'react';
import { AsideBlock, ContentContainer, Pagination, Search } from '../../components';
import { GroupBlock, ProductsCard } from './ui';
import { PAGINATION_LIMIT } from '../../constans';
import { debonce, request } from '../../utils';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';

const MainContainer = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [groups, setGroups] = useState([]);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getProduct({ searchPhrase, page }));


		Promise.all([
			request(
				`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			),
			request('/groups'),
		]).then(
			([
				{
					data: { products, lastPage },
				},
				{ data: dataGroups },
			]) => {
				setProducts(products);
				setLastPage(lastPage);
				setGroups(dataGroups);
			},
		);
	}, [dispatch, page, shouldSearch]);

	const startDelaySearch = useMemo(() => debonce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<>
			<main className={className}>
				<ContentContainer>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
					<div className="main__inner">
						<AsideBlock title="Каталог">
							<GroupBlock groups={groups} />
						</AsideBlock>
						<div className="content">
							<div className="filter">Функции сортировки</div>
							<div className="content__inner">
								{products.map(
									({ id, title, image_url, description, price }) => (
										<ProductsCard
											id={id}
											key={id}
											title={title}
											image_url={image_url}
											description={description}
											price={price}
										/>
									),
								)}
							</div>

							{lastPage > 1 && (
								<Pagination
									page={page}
									lastPage={lastPage}
									setPage={setPage}
								/>
							)}
						</div>
					</div>
				</ContentContainer>
			</main>
		</>
	);
};

export const Main = styled(MainContainer)`
	.main {
		margin-top: 40px;
	}

	.main__inner {
		display: grid;
		grid-template-columns: 261px auto;
		gap: 40px;
	}

	.content__inner {
		display: flex;
		flex-direction: column;
		row-gap: 40px;
	}
`;
