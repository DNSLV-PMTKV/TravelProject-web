import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

const LoginPage = React.lazy(() => import('./pages/login/Login'));

const App: React.FC = () => {
    return (
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
    );
};

export default App;
