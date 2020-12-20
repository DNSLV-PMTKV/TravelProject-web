import { ThemeProvider } from '@material-ui/core';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { theme } from './theme';
import { Layout } from './containers/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './redux/reducers';
import { setAuthenticated } from './redux/users/userActions';

const ErrorPage = React.lazy(() => import('./pages/error/Error'));
const LoginPage = React.lazy(() => import('./pages/login/Login'));
const RegisterPage = React.lazy(() => import('./pages/register/Register'));

const asd: React.FC = () => {
    return <div>ALO DA?</div>;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state: ApplicationState) => state.user.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) dispatch(setAuthenticated());
    }, [authenticated]);

    console.log('authenticated', authenticated);
    return (
        <ThemeProvider theme={theme}>
            <Layout authenticated={authenticated}>
                <Suspense fallback={'loading..'}>
                    <Router>
                        <Switch>
                            <Route path='/' exact component={asd} />
                            <Route path='/register' component={RegisterPage} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/error' component={ErrorPage} />
                            <Redirect to='/error' />
                        </Switch>
                    </Router>
                </Suspense>
            </Layout>
        </ThemeProvider>
    );
};

export default App;
