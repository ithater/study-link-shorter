import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useHttp } from './../Hooks/http.hook';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { request } = useHttp();
	const [link, setLink] = useState('');

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = evt => setLink(evt.target.value);
	const pressHandler = async evt => {
		if (evt.key !== 'Enter') return;
		try {
			const data = await request('/api/link/generate', 'POST', { from: link }, {
				Authorization: `Bearer ${auth.token}`
			});
			history.push(`/detail/${data.link._id}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="row">
			<div
				className="col s8 offset-s2"
				style={{
					paddingTop: '2rem',
				}}
			>
				<div className="input-field">
					<input
						placeholder="Вставьте ссылку"
						id="link"
						type="text"
						value={link}
						onChange={changeHandler}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="link">Введите ссылку</label>
				</div>
			</div>
		</div>
	);
};
