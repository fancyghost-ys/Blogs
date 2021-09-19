import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ProfileLayout from '../../Layouts/Profile/ProfileLayout'
import { createUser, signin, setData, isExist, signout } from './apiCore'

const Profile = () => {
    const [showCreateAccount, setshowCreateAccount] = useState(false)
    const [values, setValues] = useState({
        userName: '',
        error: '',
        success: false,
        redirectTo: false
    })
    const { userName, success, error, redirectTo } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const clickSubmit = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await createUser({ userName })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setData(data, () => {
                        setValues({ ...values, userName: '', error: '', success: true, redirectTo: true })
                    })
                }
            })
    }

    const clickSignin = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await signin({ userName })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setData(data, () => {
                        setValues({ ...values, userName: '', error: '', success: true, redirectTo: true })
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
            return <Redirect to="/home" />;
        }
    }

    const signUpForm = () => (
        <form>
            {showError()}
            {showSuccess()}
            {redirectUser()}

            {showCreateAccount &&
                <div>           <h4> Create New</h4>
                    <div className="form-group">
                        <label className="text-muted fs-5">User Name</label>
                        <input onChange={handleChange('userName')} type="text" className="form-control"
                            value={userName}
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
                        <label className="text-muted fs-5">User Name</label>
                        <input onChange={handleChange('userName')} type="text" className="form-control"
                            value={userName}
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
                <Profile />
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
export default Profile;