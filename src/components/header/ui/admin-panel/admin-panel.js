import styled from 'styled-components';
import { TextBlock } from '../../../text-block/text-block';
import { Link } from 'react-router-dom';
import { IconProductsEdit, IconUsers } from '../../../icons';

const AdminPanelContainer = ({ className }) => (
	<div className={className}>
		<TextBlock>Админ меню</TextBlock>
		<ul className="admin-panel__list">
			<li>
				<IconUsers />
				<Link to="/users">Пользователи</Link>
			</li>
			<li>
				<IconProductsEdit/>
				<Link to="/products-edit">Редактирование товаров</Link>
			</li>
		</ul>
	</div>
);

export const AdminPanel = styled(AdminPanelContainer)`
	position: relative;
	cursor: pointer;

	.admin-panel__list {
		position: absolute;
		right: 0;
		top: 100%;
		min-height: 60px;
		min-width: 200px;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		padding: 20px 10px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
		list-style: none;
		opacity: 0;
		visibility: hidden;
		z-index: -1;
		transition: all 0.2s ease;
	}

	.admin-panel__list li {
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	&:hover .admin-panel__list {
		opacity: 1;
		visibility: visible;
		z-index: 2;
	}

	.admin-panel__list a {
		font-size: 16px;
		line-height: 120%;
		font-weight: 400;
		color: #000 !important;
		text-decoration: none;
	}

	.admin-panel__list a:hover {
		text-decoration: underline;
	}
`;
