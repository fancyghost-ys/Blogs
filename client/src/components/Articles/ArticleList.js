import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Img from '../../assets/up-arrow.svg'
import { getAllArticles, getTopArticle } from './apiCore';
import moment from 'moment'
import Moment from 'react-moment'


const ArticleList = () => {
    const [values, setValues] = useState([])
    const [top, setTop] = useState([]);
;

    const init = async () => {
        await getAllArticles().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setValues(data);
            }
        });
    };

    const loadTopThumbs = async () => {
        await getTopArticle().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setTop(data);
            }
        });
    }
    useEffect(() => {
        init();
        loadTopThumbs()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h4 className="p-4">Top Thumbs Articles</h4>
                    <div class="card m-2" >
                        <h4 className="card-header">Top Reading </h4>
                        <ul class="list-group list-group-flush">
                            {
                                top &&
                                top.map((t, j) => (
                                    <li class="list-group-item" key={j}>{t.article.title} <span className="float-end"><img src={Img} alt={Img} width="20" height="20" /></span><span className="float-end">{t.count}</span></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-9">
                    <h4 className="p-4">All Articles</h4>
                    {
                        values &&
                        values.map((u, i) => (
                            <div className="card m-2">
                                <div className="card-header" key={i}>
                                    <h4>{u.title}</h4>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-3">
                                        <p>{(u.body).substring(0, 50)} .....</p>
                                        <footer className="blockquote-footer">{u.author.name} <cite title="Source Title">{u.author.jobTitle}</cite></footer>
                                    </blockquote>
                                    <Link className="btn btn-danger" to={`/article/${u.id}`} >Read Full Article</Link>
                                </div>
                                <div className="card-footer text-muted">
                                    CreatedAt:  <p >  <Moment format="YYYY/MM/DD">{u.createdAt}</Moment> <p className="float-end">{moment(u.updatedAt).fromNow()}</p> </p>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
};

export default ArticleList;





