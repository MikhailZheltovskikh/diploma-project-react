import {
	ContentContainer,
	Filter,
	H2,
	H3,
	Loader,
	Pagination,
	Search,
} from '../../components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { debonce } from '../../utils';
import { ProductsCard } from '../main/ui';
import styled from 'styled-components';
import { selectGroup, selectProducts } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFilterGroupAsync } from '../../redux/action';

const CatalogContainer = ({ className }) => {
	const params = useParams();

	const [page, setPage] = useState(1);

	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const [selectedGroupId, setSelectedGroupId] = useState(params.id || '');

	const { groups } = useSelector(selectGroup);
	const { products, lastPage, isLoading } = useSelector(selectProducts);

	const dispatch = useDispatch();

	const [priceSort, setPriceSort] = useState('');

	useEffect(() => {
		dispatch(
			getProductsFilterGroupAsync(searchPhrase, page, selectedGroupId, priceSort),
		);
	}, [dispatch, page, searchPhrase, shouldSearch, selectedGroupId, priceSort]);

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
					{isLoading ? (
						<Loader />
					) : (
						<>
							<H2>
								{params.id
									? groups.find((group) => group.id === params.id)?.name
									: 'Каталог'}
							</H2>
							{products < 1 ? (
								<H3 className="subtitle">
									Товаров в выбранной группе нет
								</H3>
							) : (
								<>
									<Filter setPriceSort={setPriceSort} />
									{products.map(
										({
											id,
											title,
											image_url,
											description,
											price,
										}) => (
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
								</>
							)}
						</>
					)}
				</div>
				{lastPage > 1 && (
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

	.subtitle {
		text-align: center;
	}
`;
