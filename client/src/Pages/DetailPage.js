import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from './../Hooks/http.hook';
import { AuthContext } from './../Context/AuthContext';
import { Loader } from './../Components/Loader';
import { LinkCard } from '../Components/LinkCard';

export const DetailPage = () => {
	const { token } = useContext(AuthContext);
	const { request, loding } = useHttp();
	const [link, setLink] = useState(null);
	const linkId = useParams().id;

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setLink(fetched);
		} catch (error) {}
	}, [token, linkId, request]);

	useEffect(() => {
		getLink();
	}, [getLink]);

	if (loding) return <Loader />;

	return <>{!loding && link && <LinkCard link={link} />}</>;
};
