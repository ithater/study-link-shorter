import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';

import { useRoutes } from './routes';
import { useAuth } from './Hooks/auth.hook';
import { AuthContext } from './Context/AuthContext';
import { Navbar } from './Components/Navbar';
import { Loader } from './Components/Loader';

function App() {
	const { token, login, logout, userId, ready } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated);
	
	if (!ready) {
		return <Loader />	
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
			}}
		>
			<Router>
				{isAuthenticated && <Navbar />}	
				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
