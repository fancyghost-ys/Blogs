import React, { Fragment, useEffect, useState } from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Menu from '../../Layouts/Menu/Menu';
import { isExist } from '../../User/Profile/apiCore';
import { getAllAuthors, searchArticleOptions, searchByAuthorName } from '../apiCore';

const Search = ({ match }) => {
    const [Author, setAuthor] = useState(false)
    const [Search, setSearch] = useState(true)
    const [AuthorData, setAuthorData] = useState({})
    const userId = isExist().user.id;
    const [data, setData] = useState({
        search: '',
        type: '',
        author: '',
        result: [],
        searched: false
    })
    let searchResult;
    const { search, author, type, result, searched } = data;

    const SearchOptions = () => {
        return (
            <div className="position-sticky pt-3">
                <h4 className="card-header">Search Options</h4>
                <ul className="nav flex-column">
                    <li className="list-group-item">
                        <button className="btn" onClick={() => [setAuthor(false), setSearch(true)]}>
                            Search By Article
                            </button>

                    </li>
                    <li className="list-group-item">
                        <button className="btn" onClick={() => [setAuthor(true), setSearch(false)]}>
                            Search By Author
                            </button>

                    </li>
                </ul>

            </div>
        );
    };

    const searchArticle = async () => {
        if (type == 'title') {
            searchResult = await searchArticleOptions({ title: search })
        }
        else if (type == 'body') {
            searchResult = await searchArticleOptions({ body: search })
        }
        else {
            searchResult = await searchArticleOptions({ search })
        }
        if (searchResult.error) {
            console.log(searchResult.error)
        }
        else {
            setData({ ...data, result: searchResult, searched: true });
        }

    }

    const searchByAuthor = async (e) => {
        e.preventDefault()

        searchResult = await searchByAuthorName({ name: author })

        if (!searchResult || searchResult.error) {
            console.log(searchResult.error)
        }
        else {
            setData({ ...data, result: searchResult, searched: true });
        }

    }

    const searchSubmit = e => {
        e.preventDefault()
        searchArticle()
    }

    const handleChange = name => event => {
        setData({ ...data, error: false, [name]: event.target.value })
    }

    const searchMessage = (searched, result) => {
        if (searched && result.length > 0) {
            return `Found ${result.length} Articles`
        }
        else if (searched && result.length < 1) {
            return `No Articles found`
        }
    }
    const searchedArticle = (result = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">{searchMessage(searched, result)}</h2>
                <div className="row">
                    {result.map((u, i) => (
                        <div className="card m-5 container">
                            <div className="card-header" key={i}>
                                {u.title}
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-3">
                                    <p>{(u.body).substring(0, 50)} .....</p>
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
        )
    }


    const generalSearchEngine = () => {
        return (
            <div className="container">
                <p>Search By Article Title or Part of Article</p>
                <form class="d-flex" onSubmit={searchSubmit}>
                    <select className="btn me-2 text-left" onChange={handleChange("type")}>
                        <option>Choose option</option>
                        <option value="title">Article Title</option>
                        <option value="body">Piece of Content</option>

                    </select>
                    <input class="form-control me-2" type="search"
                        placeholder="Search" aria-label="Search" onChange={handleChange("search")} />
                    <button class="btn btn-outline-success" type="submit" >Search</button>
                </form>
                <div>
                    {searchedArticle(result)}
                </div>
            </div>
        )
    }

    const SearchByAuthor = () => {
        return (
            <div className="container">
                <p>Search By Author Name</p>
                <form class="d-flex" onSubmit={searchByAuthor}>
                    <select className="form-select me-2" onChange={handleChange("author")}>
                        <option value="">Select Author</option>
                        {
                            AuthorData && AuthorData.map((a, i) => (
                                <option key={i} value={a.name} >
                                    {a.name}
                                </option>
                            ))
                        }
                    </select>
                    <button class="btn btn-outline-success" type="submit" >Search</button>

                </form>
                <div>
                    {searchedArticle(result)}
                </div>
            </div>
        )
    }

    const loadAuthorName = async () => {
        await getAllAuthors().then(
            data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setAuthorData(data)
                }
            }
        )
    }
    useEffect(() => {
        loadAuthorName()
    }, [])
    return (
        <div>
            <Menu />
            <div className="row container">
                <div className="col-3">{SearchOptions()}</div>
                <div className="col-9">
                    <h1>Articles Archive</h1>
                    {Search && !Author &&
                        generalSearchEngine()}
                    {Author && !Search && SearchByAuthor()}
                </div>
            </div>
        </div>
    );
};


export default Search;
