import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import ArticleList from './components/Articles/ArticleList'
import ArticlePage from './components/Articles/ArticlePage/ArticlePage'
import Home from './components/Home/Home'
import Search from './components/Articles/Search/Search'
import Profile from './components/User/Profile/Profile'
import PrivateRoute from './PrivateRoute'
import AuthorProfile from './components/Author/CreateorSignin/AuthorProfile'
import AuthorDashboard from './components/Author/AuthorDashboard/AuthorDashboard'
import PageNotFound from './PageNotFound'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact >
                    <App />
                </Route>
                <PrivateRoute path='/home' exact component={Home} />
                <Route path='/profile' exact component={Profile} />
                <PrivateRoute path='/search' exact component={Search} />
                <PrivateRoute path='/author/dashboard' exact component={AuthorDashboard} />
                <Route path='/author/profile' exact component={AuthorProfile} />
                <PrivateRoute path='/articles' exact component={ArticleList} />
                <PrivateRoute path='/article/:articleId' exact component={ArticlePage} />
                <Route path="*" component={PageNotFound} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes