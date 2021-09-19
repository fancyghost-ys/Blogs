import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ProfileLayout from '../../Layouts/Profile/ProfileLayout'
import { isExist, setData, signout } from '../../User/Profile/apiCore'
import { createAuthor, signinAuthor } from './apiCore'

const AuthorProfile = () => {
    const [showCreateAccount, setshowCreateAccount] = useState(false)
    const [values, setValues] = useState({
        name: '',
        jobTitle: '',
        error: '',
        success: false,
        redirectTo: false
    })
    const { name, jobTitle, success, error, redirectTo } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const clickSubmit = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await createAuthor({ name, jobTitle })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setData(data, () => {
                        setValues({ ...values, name: '', jobTitle: '', error: '', success: true, redirectTo: true })
                    })
                }
            })
    }

    const clickSignin = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await signinAuthor({ name })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setData(data, () => {
                        setValues({ ...values, name: '', error: '', success: true, redirectTo: true })
                    })
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger fs-6 h-1" height="4" style={{ display: error ? '' : 'none' }}>
            <p>x {error}</p>
        </div>
    );
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Hi, Dear</h2>
            <p>Your account is created Successfully</p>
        </div>
    )
    const redirectUser = () => {
        if (redirectTo) {
            return <Redirect to="/author/dashboard" />;
        }
    }

    const signUpForm = () => (
        <form>
            {showError()}
            {showSuccess()}
            {redirectUser()}

            {showCreateAccount &&
                <div>
                    <h4> Create New</h4>
                    <div className="form-group">
                        <label className="text-muted fs-5">Name</label>
                        <input onChange={handleChange('name')} type="text" className="form-control"
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted fs-5">Job Title</label>
                        <input onChange={handleChange('jobTitle')} type="text" className="form-control"
                            value={jobTitle}
                        />
                    </div>
                    <button onClick={clickSubmit} class="w-100 btn btn-ls my-2 btn-sub" type="submit">Creat New</button>
                    <p class="mt-2 mb-1 fs-7">I have Account<span className="p-2" onClick={() => setshowCreateAccount(false)}>SignIn</span></p>
                </div>
            }

            {!showCreateAccount &&
                <div>
                    <h4> Sign In</h4>
                    <div className="form-group">
                        <label className="text-muted fs-5">Name</label>
                        <input onChange={handleChange('name')} type="text" className="form-control"
                            value={name}
                        />
                    </div>
                    <button onClick={clickSignin} class="w-100 btn btn-ls my-2 btn-sub" type="submit">SignIn</button>
                    <p class="mt-2 m-2 fs-7">I Don't have Account <span className="p-2" onClick={() => setshowCreateAccount(true)}>Create User</span></p>
                </div>
            }

        </form>
    )

    useEffect(() => {
        if (isExist) {
            signout(() => {
                <AuthorProfile />
            })
        }
    }, [])
    return (
        <ProfileLayout HeaderPage="Create Account or Signin"
            Description="Hello in The Mag"
            className="contianer col-md-8 offset-2"
            Childern={signUpForm()}
        >
        </ProfileLayout>
    )
}
export default AuthorProfile;