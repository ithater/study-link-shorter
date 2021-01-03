import { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from './../Hooks/http.hook';
import { AuthContext } from './../Context/AuthContext';
import { Loader } from '../Components/Loader';
import { LinksList } from './../Components/LinksList';

export const LinksPage = () => {
	const [links, setLinks] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	console.log('token: ', token);

	const fetchLinks = useCallback(async () => {
		try {
			const fetchedLinks = await request('/api/link', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setLinks(fetchedLinks);
		} catch (error) {
			console.error(error);
		}
	}, [token, request]);

	useEffect(() => {
		fetchLinks();
	}, [fetchLinks])

	if (loading) return <Loader/>

	return (
		<>
			{!loading && <LinksList links={links} />}
		</>
	);
};
