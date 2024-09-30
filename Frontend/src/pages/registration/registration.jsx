import { H2, Input, Button, AuthFormError } from '../../components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { setUser } from '../../action';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import styled from 'styled-components';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин.')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа.')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов.'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа.')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов.'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Повтор пароля"
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button maxWidth="220px" margin="40px auto 0">
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	width: 400px;
	margin: 100px auto 0;

	form {
		display: flex;
		flex-direction: column;
		margin-top: 80px;
	}

	input + input {
		margin-top: 16px;
	}
`;
