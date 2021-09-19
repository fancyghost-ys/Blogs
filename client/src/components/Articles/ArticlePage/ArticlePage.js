import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import Img from '../../../assets/thumbs-up.svg'
import Img2 from '../../../assets/like.svg'
import './ArticlePage.css'
import Menu from '../../Layouts/Menu/Menu';
import { isExist } from '../../User/Profile/apiCore';
import { AddCommentToArticle, getArticleById, thumbsUpArticle } from '../apiCore';

const ArticlePage = ({ match }) => {
    const [article, setArticle] = useState({})
    const [thump, setthump] = useState(Img);
    const userId = isExist().user.id;
    const [values, setValues] = useState({
        comment: '',
        error: '',
        success: false
    })

    const { comment, success, error } = values
    const loadingArticleInfo = async (articleId) => {
        await getArticleById(articleId).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setArticle(data);
            }
        })
    }

    const thumbUp = async (articleId) => {
        await thumbsUpArticle(articleId, userId).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setthump(Img2)
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const clickSubmit = async (event) => {
        let articleId = article.id;
        event.preventDefault()
        if (comment !== '') {
            setValues({ ...values, error: false })
            await AddCommentToArticle(articleId, userId, { comment })
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, success: false })
                    }
                    else {
                        setValues({ ...values, comment: '', error: '', success: true, })
                    }
                })
        }
        else {
            setValues({ ...values, comment: '', error: 'Please Enter Your comment', success: false, })

        }
    }
    const showError = () => (
        <div className="alert alert-danger fs-6 h-1" height="4" style={{ display: error ? '' : 'none' }}>
            <p>x {error}</p>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Hi, Dear</h2>
            <p>Comments Send Successfully</p>
        </div>
    )

    const addComments = () => {
        return (
            <div className="container-fluid">
                <div className="position-sticky pt-3">
                    {showError()}
                    {showSuccess()}
                    <p className="card-header">Enter Your Comment</p>
                    <ul className="nav flex-column">
                        <li className="list-group-item">
                            <div className="form-group">
                                <label className="text-muted fs-5">Writet comment</label>
                                <input onChange={handleChange('comment')} type="text" className="form-control"
                                    value={comment}
                                />
                            </div>
                            <button onClick={clickSubmit} className="w-100 btn btn-ls my-2 btn-sub" type="submit">Submit</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    useEffect(() => {
        const articleId = match.params.articleId;
        loadingArticleInfo(articleId);
    }, [])

    return (
        <div>
            <Menu />
            <div className="container">
                <h1>Full Article</h1>
                {
                    article && (
                        <Fragment>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}
                                        <img className="float-end btn" width="60" height="60" src={thump} onClick={() => { thumbUp(article.id) }} />
                                    </h5>
                                    <p className="card-text">{article.body}</p>
                                    <p className="card-text"><small className="text-muted">Last update {moment(article.updatedAt).fromNow()}</small></p>
                                </div>
                            </div>

                            <div>
                                {addComments(article.id)}
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
};


export default ArticlePage;
