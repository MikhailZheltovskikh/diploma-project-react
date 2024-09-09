import { useEffect, useMemo, useState } from 'react';
import {
	Button,
	ContentContainer,
	H2,
	Pagination,
	PrivateContent,
	Search,
	TextBlock,
} from '../../components';
import { ProductRow, TableRow } from './ui';
import { useServerRequest } from '../../hooks';
import { checkAccess } from '../../bff/utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import { CLOSE_MODAL, openModal } from '../../action';
import styled from 'styled-components';
import { CreateProduct } from './ui/create-product/create-product';
import { PAGINATION_LIMIT } from '../../bff/constans';
import { getLastPageFromLinks } from '../../components/pagination/utils';
import { debonce } from '../../utils';



const ProductsEditContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [products, setProducts] = useState([]);
	const [groups, setGroups] = useState([]);

	const [shouldUpdateProductList, setShouldUpdateProductList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([
			requestServer('fetchProducts',searchPhrase, page, PAGINATION_LIMIT),
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
	}, [requestServer, userRole, shouldUpdateProductList, page, shouldSearch]);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onProductsRemove = (productsId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					requestServer('removeProduct', productsId).then(() => {
						setShouldUpdateProductList(!shouldUpdateProductList);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const editProductOnSave = (saveProductData) => {
		dispatch(
			openModal({
				text: 'Сохранить изменения?',
				onConfirm: () => {
					requestServer('saveProduct', saveProductData).then(() => {
						setShouldUpdateProductList(!shouldUpdateProductList);
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const createHandleSubmit = (saveProductData) => {
		dispatch(
			openModal({
				text: 'Добавить новый товар в базу данных?',
				onConfirm: () => {
					requestServer('saveProduct', saveProductData).then(() => {
						setShouldUpdateProductList(!shouldUpdateProductList);
					});
					handleCloseModal();
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const startDelaySearch = useMemo(() => debonce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<ContentContainer>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
					<H2>Редактирование товаров</H2>
					<div className="products-inner">
						<>
							<Button
								maxWidth="180px"
								className="new-product"
								onClick={handleOpenModal}
							>
								Новый товар
							</Button>
							{isModalOpen && (
								<CreateProduct
									createHandleSubmit={createHandleSubmit}
									handleCloseModal={() => handleCloseModal()}
								/>
							)}
						</>

						<TableRow>
							<TextBlock className="products-row-item">Id</TextBlock>
							<TextBlock className="products-row-item">
								Наименование
							</TextBlock>
							<TextBlock className="products-row-item">Категория</TextBlock>
							<TextBlock className="products-row-item">Описание</TextBlock>
							<TextBlock className="products-row-item">Стоимость</TextBlock>
							<TextBlock className="products-row-item">Фото</TextBlock>
							<TextBlock className="products-row-item">Кол-во</TextBlock>
							<TextBlock className="products-row-item">Действия</TextBlock>
						</TableRow>
						{products.map(
							({
								id,
								title,
								group,
								image_url,
								description,
								price,
								amount,
							}) => (
								<ProductRow
									id={id}
									key={id}
									title={title}
									groups={groups}
									group={group}
									image_url={image_url}
									description={description}
									price={price}
									amount={amount}
									onProductsRemove={() => onProductsRemove(id)}
									editProductOnSave={editProductOnSave}
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
				</ContentContainer>
			</div>
		</PrivateContent>
	);
};

export const ProductsEdit = styled(ProductsEditContainer)`
	.products-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 50px;
	}

	.new-product {
		position: absolute;
		right: 0;
		top: -60px;
	}

	.products-row-item {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		border: 1px solid #000000;
		height: 50px;
	}
`;
