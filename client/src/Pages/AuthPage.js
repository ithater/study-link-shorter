import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useHttp } from './../Hooks/http.hook';
import { useMessage } from './../Hooks/message.hook';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, request, error, clearError } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = evt => {
		setForm({ ...form, [evt.target.name]: evt.target.value });
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form });
			message(data.message);
		} catch (error) {
			console.error(error);
		}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form });
			auth.login(data.token, data.userId);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи ссылку</h1>

				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									className="yellow-input"
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor="password">Пароль</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{
								marginRight: 10,
							}}
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button
							className="btn grey lighten-1 black-text"
							onClick={registerHandler}
							disabled={loading}
						>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
