export const LinkCard = ({ link }) => {
	return (
		<>
			<h2>Ссылка</h2>
			<p>
				Выша ссылка:&ensp;
				<a href={link.to} target="_blank" rel="noopener noreferrer">
					 {link.to}
				</a>
			</p>
			<p>
				Откуда:&ensp; 
				<a href={link.from} target="_blank" rel="noopener noreferrer">
					{link.from}
				</a>
			</p>
			<p>
				Количество кликов по ссылке:&ensp; 
				<strong>{link.clicks}</strong>
			</p>
			<p>
				Дата создания:&ensp;
				<strong>{new Date(link.date).toLocaleDateString()}</strong>
			</p>
		</>
	);
};
