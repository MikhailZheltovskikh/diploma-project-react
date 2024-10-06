import { useEffect, useMemo, useState } from 'react';
import {
	AsideBlock,
	ContentContainer,
	Filter,
	Loader,
	Pagination,
	Search,
} from '../../components';
import { GroupBlock, ProductsCard } from './ui';
import { debonce } from '../../utils';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsAsync, getProductsAsync } from '../../redux/action';
import { selectGroup, selectProducts } from '../../redux/selectors';

const MainContainer = ({ className }) => {
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const { groups } = useSelector(selectGroup);
	const { products, lastPage, isLoading } = useSelector(selectProducts);

	const dispatch = useDispatch();

	const [priceSort, setPriceSort] = useState('');

	useEffect(() => {
		dispatch(getProductsAsync(searchPhrase, page, priceSort));
		dispatch(getGroupsAsync());
	}, [dispatch, page, searchPhrase, shouldSearch, priceSort]);

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
					{isLoading ? (
						<Loader />
					) : (
						<div className="main__inner">
							<AsideBlock title="Каталог">
								<GroupBlock groups={groups} />
							</AsideBlock>
							<div className="content">
								<Filter setPriceSort={setPriceSort} />
								<div className="content__inner">
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
					)}
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
