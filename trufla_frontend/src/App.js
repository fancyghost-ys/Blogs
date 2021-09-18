import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App bg">
      <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <h1 className="font1 mt-5">The Mag</h1>
        <h3 className="font2 mt-3">Mag is a free magazine that allows users to read any article<br />
    and interact with other users and authors</h3>
        <hr />
        <h4 class="font2 mt-3">So Are you Ready?</h4>
          <div class="me-3">
            <Link className="btn btn-success  font-1 me-3" to="/profile">Reader</Link>
            <Link className="btn btn-primary  font-1" to="/author/profile">Author</Link>
          </div>
      </div>
    </div>
  );
}

export default App