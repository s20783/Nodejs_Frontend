import React from 'react'
import {withTranslation} from "react-i18next";
import FormInput from "../../helpers/FormInput";
import {loginCall} from "../../api/authApiCalls";

import {isAuthenticated} from "../../helpers/authHelper";
import {Link} from "react-router-dom";
import {withRouter} from "../../helpers/ddd";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            user: {
                Nazwisko: '',
                Password: ''
            },
            errors: {
                Nazwisko: '',
                Password: ''
            },
            error: '',
            message: '',
            prevPath: ''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const user = {...this.state.user}
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const user = this.state.user
            let response;
            loginCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data)
                                this.props.handleLogin(userString)
                            }
                        }
                        else if (response.status === 401) {
                            console.log(401)
                            this.state({message: data.message})
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
        }
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Nazwisko') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'Password') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }

        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }



    render() {
        const {t} = this.props
        const {user} = this.state
        //const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>Log out</button> : <Link to="/login">Log in</Link>



        const pageTitle = `${t("logging.login")}`
        const content = <>
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="Nazwisko">Login: <span
                    className="symbol-required"> *</span></label>
                <input type="text" name="Nazwisko" id="Nazwisko" onChange={this.handleChange}
                       placeholder={t('logging.placeholderLogin')}
                       className={this.state.errors.Nazwisko ? 'error-input' : ''}/>
                <span id="errorNazwisko" className="errors-text">{this.state.errors.Nazwisko}</span>


                <label htmlFor="Password">{t('logging.password')}: <span
                    className="symbol-required"> *</span></label>
                <input type="text" name="Password" id="Password" onChange={this.handleChange}
                       placeholder={t('logging.placeholderPassword')}
                       className={this.state.errors.Nazwisko ? 'error-input' : ''}/>
                <span id="errorPassword" className="errors-text">{this.state.errors.Password}</span>

                {/*<span id="loginErrors" className="errors-text"></span>*/}

                <div className="form-buttons2">
                    <input type="submit" value={t("logging.login")} className="button-login"/>
                </div>
            </form>
        </>

        return (
            <main>
                <h2>
                    {pageTitle}
                </h2>
                {content}
            </main>
        )
    }
}



export default withTranslation()(withRouter(LoginForm))