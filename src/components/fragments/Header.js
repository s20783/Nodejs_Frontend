import { withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {getCurrentUser, getImie, getName, getNazwisko, isAuthenticated} from "../../helpers/authHelper";
import React from "react";
import {useParams} from "react-router";
import {loginCall} from "../../api/authApiCalls";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Nazwisko: '',
                Password: ''
            },
            errors: {
                Nazwisko: '',
                Password: ''
            },
            Imie: '',
            Rola: '',
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
                                this.state.Imie = data.Imie
                                const userString = JSON.stringify(data)
                                this.props.handleLogin(userString)
                            }
                        }
                        else if (response.status === 401) {
                            console.log(data.message)
                            this.setState({message: data.message})
                        } else {
                            console.log(data)
                            this.setState({message: data.message})
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error: error
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
                this.state.error = 'fddfgfdgfgdfg'
                return true
            }
        }
        return false
    }


    render() {
        const {user, isLoaded} = this.state
        const { t } = this.props;
        const errorText = `${t('logging.loggingError')}`
        const loginLogoutLink = isAuthenticated() ?
            <button onClick={this.props.handleLogout} className="button-logout">{t('logging.logout')}</button>
            : <Link to="/login">Zaloguj się</Link>
        const login =
            <form className="form2" onSubmit={this.handleSubmit}>
            <label htmlFor="Nazwisko">Login: </label>
            <input type="text" name="Nazwisko" id="Nazwisko" onChange={this.handleChange}
                   placeholder={t('logging.placeholderLogin')}
                   className={this.state.errors.Nazwisko ? 'error-input' : ''}/>
            <span id="errorNazwisko" className="errors-text"></span>


            <label htmlFor="Password">{t('logging.password')}: </label>
            <input type="text" name="Password" id="Password" onChange={this.handleChange}
                   placeholder={t('logging.placeholderPassword')}
                   className={this.state.errors.Password ? 'error-input' : ''}/>
            <span id="errorPassword" className="errors-text"></span>

            <div className="form-buttons2">
                {/*<a color="#ffffff">tu będzie błąd</a>*/}
                {/*{loginLogoutLink}*/}
                <input type="submit" value={t("logging.login")} className="button-login"/>
                {/*<a className="error-login">{this.state.error ? errorText : ''}</a>*/}
                <a className="error-login">{this.state.message ? errorText : ''}</a>
            </div>
        </form>

        const logout = <div className="logout">
                <span>{t('logging.welcomeText')}</span>
                <p className="login-text">{getImie()}</p>
                <p className="login-text">{getNazwisko()}</p>

                <div className="form-buttons3">
                    {loginLogoutLink}
                </div>
            </div>

        return (
            <header>
                <Link to={'/'} className="xd"><img src="/images/ball2.png" alt="logo" width="180" height="153"/></Link>
                <h1>Liga Piłkarska</h1>

                {!isAuthenticated() && login}
                {isAuthenticated() && logout}
            </header>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation() (withRouter(Header));