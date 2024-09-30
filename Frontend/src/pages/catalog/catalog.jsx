import {
	ContentContainer,
	H2,
	Pagination,
	Search,
} from '../../components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { debonce } from '../../utils';
import { getLastPageFromLinks } from '../../components/pagination/utils';
import { PAGINATION_LIMIT } from '../../bff/constans';
import { ProductsCard } from '../main/ui';
import styled from 'styled-components';

const CatalogContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const params = useParams();

	const [products, setProducts] = useState([]);
	const [groups, setGroups] = useState([]);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const [selectedGroupId, setSelectedGroupId] = useState(params.id || '');


	useEffect(() => {
		// Promise.all([
		// 	request(
		// 		`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		// 	),
		// 	request('/groups'),
		// ]).then(
		// 	([
		// 		{
		// 			data: { products, lastPage },
		// 		},
		// 		{ data: dataGroups },
		// 	]) => {
		// 		setProducts(products);
		// 		setLastPage(lastPage);
		// 		setGroups(dataGroups);
		// 	},
		// );

		Promise.all([
			requestServer('fetchProducts', searchPhrase, page, PAGINATION_LIMIT,  selectedGroupId),
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
	}, [requestServer, page, shouldSearch]);

	const startDelaySearch = useMemo(() => debonce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<>
			<ContentContainer>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />

				<div className={className}>
					<H2>
						{params.id
							? groups.find((group) => group.id === params.id)?.name
							: 'Каталог'}
					</H2>
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
				{lastPage > 1 &&  (
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				)}
			</ContentContainer>
		</>
	);
};

export const Catalog = styled(CatalogContainer)`
	display: grid;
	grid-template-columns: 1fr;
	gap: 35px;
	margin-top: 40px;
`;
