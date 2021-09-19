import React, { useEffect, useState } from 'react'
import Menu from '../../Layouts/Menu/Menu';
import { isExist } from '../../User/Profile/apiCore';
import { createArticle } from './apiCore';

const AuthorDashboard = () => {
    const authorId = isExist().author.id;
    const authorname = isExist().author.name;
    const [values, setValues] = useState({
        title: '',
        body: '',
        authorId: '',
        error: '',
        success: false,
    })
    const { title, body, author, success, error } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await createArticle({ authorId, title, body })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {

                    setValues({ ...values, title: '', body: '', error: '', success: true, redirectTo: true })
                }
            })
    }
    const AuthorOption = () => {
        return (

            <div className="position-sticky pt-3">
                <h4 className="card-header">Author Option</h4>
                <ul className="nav flex-column">
                    <li className="list-group-item">
                        <button className="btn" >
                            Create New Article
                        </button>
                    </li>
                    <li className="list-group-item">
                        <button className="btn" >
                            Manage My Articles
                        </button>

                    </li>
                </ul>

            </div>
        );
    };
    const creatArticle = () => {
        return (
            <div>
                <form>
                    {showError()}
                    {showSuccess()}
                    <h2>Write Your New Article</h2>
                    <div className="form-group">
                        <label className="text-muted fs-5">Article Title</label>
                        <input onChange={handleChange('title')} type="text" className="form-control"
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted fs-5">Article Content</label>
                        <textarea class="form-control" onChange={handleChange('body')} rows="3"
                            value={body}></textarea>
                    </div>
                    <button onClick={clickSubmit} class="w-100 btn btn-ls my-2 btn-sub" type="submit">Submit</button>
                    <p class="mt-2 mb-1 fs-6 ">&copy; 2010–2021 The Mag</p>
                </form>
            </div>

        )
    }
    const showError = () => (
        <div className="alert alert-danger fs-6 h-1" height="4" style={{ display: error ? '' : 'none' }}>
            <p>x {error}</p>
        </div>
    );
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Hi, {authorname}</h2>
            <p>Your Article Created Successfully</p>
        </div>
    )
    useEffect(() => {
    }, [])
    return (
        <div>
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col-3">{AuthorOption()}</div>
                    <div className="col-9">{creatArticle()}</div>
                </div>

            </div>
        </div>
    );
};

export default AuthorDashboard;



