import { Link } from 'react-router-dom'

import './App.css';

function PageNotFound() {
  return (
    <div className="App bg">
      <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <h1 className="font1 mt-5">The Mag</h1>
        <h2 className="font1">
          404 Page Not Found
        </h2>
        <h3><Link to="/">Go Home</Link></h3>
      </div>
    </div>
  );
}

export default PageNotFound