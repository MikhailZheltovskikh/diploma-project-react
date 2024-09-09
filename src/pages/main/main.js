import { useEffect, useMemo, useState } from 'react';
import { AsideBlock, ContentContainer, Pagination, Search } from '../../components';
import { GroupBlock, ProductsCard } from './ui';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../bff/constans';
import { getLastPageFromLinks } from '../../components/pagination/utils';

import styled from 'styled-components';
import { debonce } from '../../utils';

const MainContainer = ({ className }) => {
	const requestServer = useServerRequest();

	const [products, setProducts] = useState([]);
	const [groups, setGroups] = useState([]);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		Promise.all([
			requestServer(
				'fetchProducts',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
			),
			requestServer('fetchGroups'),
		]).then(
			([
				{
					res: { products, links },
				},
				groupsRes,
			]) => {
				setLastPage(getLastPageFromLinks(links));
				setProducts(products);
				setGroups(groupsRes.res);
			},
		);
	}, [requestServer, page, shouldSearch,]);

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
