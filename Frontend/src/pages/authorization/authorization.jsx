import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { H2, Input, Button, AuthFormError } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/action';
import styled from 'styled-components';
import { selectUserRole } from '../../redux/selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	display: inline-block;
	margin-top: 16px;
	font-size: 16px;
	line-height: normal;
	font-weight: 400;
	color: #ffcc00;
	text-align: center;
	text-decoration: none;
	outline: none;

	&:hover {
		text-decoration: underline;
	}
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request("/login", "POST", {login, password}).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Вход</H2>
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
				<Button
					type="submit"
					disabled={!!formError}
					maxWidth="220px"
					margin="40px auto 0"
				>
					Войти
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
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
