import { ThemeProvider } from '@material-ui/core';
import React, { Suspense, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { theme } from './theme';
import { Layout } from './containers/Layout/Layout';
import { InitialState, userReducer } from './redux/users/userReducer';
import { useSelector } from 'react-redux';

const LoginPage = React.lazy(() => import('./pages/login/Login'));

const asd: React.FC = () => {
    // const [state, dispatch] = useReducer(userReducer, InitialState);
    const counter = useSelector(state => state);
    console.log('counter', counter)

    // console.log('ASD STATE', state);
    return <div>ALO DA?</div>;
};

const App: React.FC = () => {
    const [state, dispatch] = useReducer(userReducer, InitialState);

    console.log('APP STATE OMEGALUL', state);
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Suspense fallback={'loading..'}>
                    <Router>
                        <Switch>
                            <Route path='/' exact component={asd} />
                            {/* <Route path='/register' component={RegisterPage} />*/}
                            <Route path='/login' component={LoginPage} />
                            <Redirect to='/error' />
                        </Switch>
                    </Router>
                </Suspense>
            </Layout>
        </ThemeProvider>
    );
};

export default App;
