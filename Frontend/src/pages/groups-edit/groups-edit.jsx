import { useEffect, useState } from 'react';
import {
	Button,
	ContentContainer,
	H2,
	PrivateContent,
	TextBlock,
} from '../../components';
import { GroupRow, TableRow } from './ui';

import { checkAccess } from '../../bff/utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import { CLOSE_MODAL, openModal } from '../../action';
import styled from 'styled-components';
import { CreateGroup } from './ui/create-group/create-group';
import { request } from '../../utils';

const GroupsEditContainer = ({ className }) => {
	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [groups, setGroups] = useState([]);

	const [shouldUpdateGroupList, setShouldUpdateGroupList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request('/groups').then((groupsRes) => setGroups(groupsRes.data));
	}, [shouldUpdateGroupList, userRole]);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onGroupRemove = (groupId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		dispatch(
			openModal({
				text: 'Удалить группу?',
				onConfirm: () => {
					request(`/groups/${groupId}`, 'DELETE').then(() => {
						setShouldUpdateGroupList(!shouldUpdateGroupList);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const editGroupOnSave = (saveGroupData) => {
		dispatch(
			openModal({
				text: 'Сохранить изменения?',
				onConfirm: () => {
					request(`/groups/${saveGroupData.id}`, "PATCH", {name: saveGroupData.name}).then(() => {
						setShouldUpdateGroupList(!shouldUpdateGroupList);
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const createHandleSubmit = (saveGroupData) => {
		dispatch(
			openModal({
				text: 'Добавить новую группу в базу данных?',
				onConfirm: () => {
					request(`/groups`, "POST", {name: saveGroupData.name}).then(() => {
						setShouldUpdateGroupList(!shouldUpdateGroupList);
					});
					handleCloseModal();
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<ContentContainer>
					<H2>Редактирование групп</H2>
					<div className="products-inner">
						<>
							<Button
								maxWidth="200px"
								className="new-product"
								onClick={handleOpenModal}
							>
								Добавить группу
							</Button>
							{isModalOpen && (
								<CreateGroup
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
							<TextBlock className="products-row-item">Действия</TextBlock>
						</TableRow>
						{groups.map(({ id, name }) => (
							<GroupRow
								id={id}
								key={id}
								name={name}
								onGroupRemove={() => onGroupRemove(id)}
								editGroupOnSave={editGroupOnSave}
							/>
						))}
					</div>
				</ContentContainer>
			</div>
		</PrivateContent>
	);
};

export const GroupsEdit = styled(GroupsEditContainer)`
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
