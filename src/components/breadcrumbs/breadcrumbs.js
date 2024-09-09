import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsContainer = ({ className }) => {
	const location = useLocation();
	
	const pathnames = location.pathname.split('/').filter(x => x);

	return (
		<>
			<div className={className}>
				<ul className="breadcrumbs-list">
					<li>
						<Link to="/">Главная</Link>
					</li>
					{pathnames.map((pathname, index) => {
						const to = `/${pathnames.slice(0, index + 1).join('/')}`;
						return (
							<li key={to}>
								<Link to={to}>{pathname}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export const Breadcrumbs = styled(BreadcrumbsContainer)`
	display: flex;
	align-items: center;
	padding: 0 10px;
	height: 50px;
	border-radius: 25px;
	border: 1px solid #000000;

	.breadcrumbs-list {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.breadcrumbs-list li {
		position: relative;
		padding: 0 15px 0 8px;
	}

	.breadcrumbs-list li,
	.breadcrumbs-list li a {
		font-size: 16px;
		line-height: 120%;
		font-weight: 700;
		color: #ffffff;
		text-decoration: none;
	}

	.breadcrumbs-list li a:hover {
		text-decoration: underline;
	}

	.breadcrumbs-list li::after {
		content: '/';
		position: absolute;
		right: 0;
		top: 0;
		font-size: 16px;
		line-height: 120%;
		font-weight: 700;
		color: #ffffff;
	}

	.breadcrumbs-list li:first-child {
		padding-left: 0;
	}

	.breadcrumbs-list li:last-child {
		padding-right: 0;
	}

	.breadcrumbs-list li:last-child::after {
		display: none;
	}
`;
