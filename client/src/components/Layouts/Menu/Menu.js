import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isExist, signout } from '../../User/Profile/apiCore'
import './Menu.css'

const isCurrentPage = (history, path) => {
    if (history.location.pathname === path) {
        return {
            color: '#b2cc1f',
            borderBottom: "3px solid #b2cc1f",
            borderRaduis: '10px'
        }
    }
    else {
        return { color: '#EDF5E1' }
    }
}

const Menu = ({ history }) => {
    return (
        <div className="menu-bar">
            <div className="container d-flex  justify-content-center py-3 mb-4">
                <h1 className="logo d-flex align-items-center mb-3 mb-md-0 me-md-auto">The Mag</h1>
                <ul className="nav nav-pills">

                    {isExist() && isExist().user && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/home')} to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/search')} to="/search">Search in Archive</Link>
                            </li>

                            <li className="nav-item img-profile">
                                <p className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }}>Hello {isExist().user.userName}</p>
                            </li>
                        </Fragment>
                    )}
                    {isExist() && isExist().author && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/author/dashboard')} to="/author/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item img-profile">
                                <p className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }}>Hello {isExist().author.name}</p>
                            </li>
                        </Fragment>

                    )}
                    {isExist() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: 'pointer', color: '#000000' }}
                                onClick={() => {
                                    signout(() => {
                                        history.push('/');
                                    })
                                }}>Signout</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu);