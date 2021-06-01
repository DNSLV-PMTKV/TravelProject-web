import { ThemeProvider } from '@material-ui/core';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { theme } from './theme';
import { Layout } from './containers/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './redux/reducers';
import { setAuthenticated } from './redux/users/userActions';
import Spinner from './components/Spinner/Spinner';
import ReactNotification from 'react-notifications-component';

const ErrorPage = React.lazy(() => import('./pages/error/Error'));
const LoginPage = React.lazy(() => import('./pages/login/Login'));
const RegisterPage = React.lazy(() => import('./pages/register/Register'));
const ActivateAccount = React.lazy(() => import('./pages/activateAccount/ActivateAccount'));
const ForgotPasswordPage = React.lazy(() => import('./pages/forgotPassword/ForgotPassword'));
const AccountInfo = React.lazy(() => import('./pages/accountInfo/AccountInfo'));

const App: React.FC = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state: ApplicationState) => state.user.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setAuthenticated(true));
        }
    }, [authenticated]);

    return (
        <ThemeProvider theme={theme}>
            <ReactNotification />
            <Suspense fallback={<Spinner />}>
                <BrowserRouter>
                    <Layout authenticated={authenticated}>
                        <Switch>
                            <Route key='account' path='/account' component={AccountInfo} />
                            <Route key='login' path='/login' component={LoginPage} />,
                            <Route key='register' path='/register' component={RegisterPage} />,
                            <Route key='activate' path='/activate/:token' component={ActivateAccount} />,
                            <Route key='forgot-password' path='/forgot-password' component={ForgotPasswordPage} />
                            <Route key='404' path='/404' component={ErrorPage} />
                            <Redirect to='/404' />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
