import { ThemeProvider } from '@material-ui/core';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { theme } from './theme';
import { Layout } from './containers/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './redux/reducers';
import { setAuthenticated } from './redux/users/userActions';
import Spinner from './components/Spinner/Spinner';
import Toast from './containers/ToastNotifications/Toast';

const ErrorPage = React.lazy(() => import('./pages/error/Error'));
const LoginPage = React.lazy(() => import('./pages/login/Login'));
const RegisterPage = React.lazy(() => import('./pages/register/Register'));
const ActivateAccount = React.lazy(() => import('./pages/activateAccount/ActivateAccount'));
const ForgotPasswordPage = React.lazy(() => import('./pages/forgotPassword/ForgotPassword'));
const AccountInfo = React.lazy(() => import('./pages/accountInfo/AccountInfo'));

const asd: React.FC = () => {
    return <div>ALO DA?</div>;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state: ApplicationState) => state.user.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) dispatch(setAuthenticated(true));
    }, [authenticated]);

    console.log('authenticated', authenticated);
    return (
        <ThemeProvider theme={theme}>
            <Layout authenticated={authenticated}>
                <Suspense fallback={<Spinner />}>
                    <BrowserRouter>
                        <Switch>
                            {!authenticated ? (
                                <>
                                    <Route path='/login' component={LoginPage} />
                                    <Route path='/register' component={RegisterPage} />
                                    <Route path='/activate/:token' component={ActivateAccount} />
                                    <Route path='/forgot-password' component={ForgotPasswordPage} />
                                </>
                            ) : null}
                            <Route path='/' exact component={asd} />
                            <Route path='/account' component={AccountInfo} />
                            <Route path='/404' component={ErrorPage} />
                            <Redirect to='/404' />
                        </Switch>
                    </BrowserRouter>
                </Suspense>
            </Layout>
            <Toast />
        </ThemeProvider>
    );
};

export default App;
