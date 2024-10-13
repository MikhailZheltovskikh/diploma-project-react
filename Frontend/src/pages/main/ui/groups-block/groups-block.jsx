import PropType from 'prop-types'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GroupBlockContainer = ({ className, groups }) => {
	return (
		<ul className={className}>
			{groups.map(({ id, name }) => (
				<li key={id}>
					<Link className="menu-link" to={`/catalog/${id}`}>
						{name}
					</Link>
				</li>
			))}
		</ul>
	);
};

export const GroupBlock = styled(GroupBlockContainer)`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	margin: 0;
	margin-top: 20px;
	padding: 0 20px;
	list-style: none;

	.menu-link {
		font-size: 16px;
		line-height: 120%;
		font-weight: 400;
		color: #000 !important;
		text-decoration: none;
	}

	.menu-link:hover {
		text-decoration: underline;
	}
`;

GroupBlock.propTypes = {
	groups: PropType.array.isRequired,
};