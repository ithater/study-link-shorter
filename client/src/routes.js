import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './Pages/LinksPage';
import { CreatePage } from './Pages/CreatePage';
import { DetailPage } from './Pages/DetailPage';
import { AuthPage } from './Pages/AuthPage';

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage />
				</Route>
				<Route path="/create" exact>
					<CreatePage />
				</Route>
				<Route path="/detail/:id">
					<DetailPage />
				</Route>
				<Redirect to="/create" />
			</Switch>
		);
	} else {
		return (
			<Switch>
				<Route path="/" exact>
					<AuthPage />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	}
};
