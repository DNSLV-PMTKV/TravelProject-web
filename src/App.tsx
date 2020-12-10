import { ThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { theme } from './theme';
import { Layout } from './containers/Layout/Layout';

const LoginPage = React.lazy(() => import('./pages/login/Login'));

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Suspense fallback={'loading..'}>
                    <Router>
                        <Switch>
                            <Route path='/' component={LoginPage} />
                            {/* <Route path='/register' component={RegisterPage} />
                    <Route path='/login' component={LoginPage} /> */}
                            <Redirect to='/error' />
                        </Switch>
                    </Router>
                </Suspense>
            </Layout>
        </ThemeProvider>
    );
};

export default App;
