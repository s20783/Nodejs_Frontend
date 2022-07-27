import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addKlub, getKlubDetails, getKlubInfo, updateKlub} from "../../api/klubyApiCalls";
import KlubyFormInput from "./KlubyFormInput";
import Navigation from "../fragments/Navigation";
import {Navigate, useLocation} from "react-router";
import { withTranslation} from "react-i18next";
import {checkTextRange} from "../../helpers/checkTextRange";
import {checkTextLength} from "../../helpers/checkTextLength";


class KlubyForm extends React.Component {
    constructor(props) {
        super(props);
        const {t} = this.props;
        const id = this.props.params.klubID

        const currentMode = id ? formMode.EDIT : formMode.NEW
        console.log(props)

        this.state = {
            ID_klub: id,
            isLoaded: false,
            klub: {
                Nazwa: '',
                Skrot: '',
                Kolor_stroju: ''
            },
            errors: {
                Nazwa: '',
                Skrot: '',
                Kolor_stroju: ''
            },
            formMode: currentMode,
            redirect: false,
            error: null,
            message: null
        }
    }

    fetchKlubDetails = () => {
        getKlubInfo(this.state.ID_klub)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            klub: {
                                Nazwa: data.Nazwa,
                                Skrot: data.Skrot,
                                Kolor_stroju: data.Kolor_stroju
                            },
                            ID_klub: data.ID_klub,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchKlubDetails()
        } else {
            this.setState({
                isLoaded: true,
            })
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const klub = {...this.state.klub}
        klub[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            klub: klub,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Nazwa') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if(!checkTextLength(fieldValue, 40)){
                    errorMessage = `${t('validation.max40')}`
                }
            }
        }
        if (fieldName === 'Skrot') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if(!checkTextRange(fieldValue,2,3)){
                    errorMessage = `${t('validation.2-3chars')}`
                }
            }
        }
        if (fieldName === 'Kolor_stroju') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if(!checkTextLength(fieldValue, 20)){
                    errorMessage = `${t('validation.max20')}`
                }
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const klub = this.state.klub
        const errors = this.state.errors
        for (const fieldName in klub) {
            const fieldValue = klub[fieldName]
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

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                emp = this.state.klub,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addKlub(emp)
            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp)
                const id = this.state.ID_klub
                promise = updateKlub(id, emp)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {

                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }


    render() {
        const {t} = this.props;
        const {redirect, isLoaded} = this.state

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego pracownika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Navigate to="/kluby" state={{ notice: 'xddddd' }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? `${t("kluby.form.add.pageTitle")}` : `${t("kluby.form.edit.pageTitle")}`
        const pageButton = this.state.formMode === formMode.NEW ? `${t("form.actions.add")}` : `${t("form.actions.save_changes")}`

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let content;
        if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <form className="form" onSubmit={this.handleSubmit}>
                <KlubyFormInput
                    type="text"
                    label={t('kluby.fields.Nazwa')}
                    required
                    error={this.state.errors.Nazwa}
                    name="Nazwa"
                    placeholder={t('kluby.fields.placeholderNazwa')}
                    onChange={this.handleChange}
                    value={this.state.klub.Nazwa}
                />
                <KlubyFormInput
                    type="text"
                    label={t('kluby.fields.Skrot')}
                    required
                    error={this.state.errors.Skrot}
                    name="Skrot"
                    placeholder={t('kluby.fields.placeholderSkrot')}
                    onChange={this.handleChange}
                    value={this.state.klub.Skrot}
                />
                <KlubyFormInput
                    type="text"
                    label={t('kluby.fields.Kolor_stroju')}
                    required
                    error={this.state.errors.Kolor_stroju}
                    name="Kolor_stroju"
                    placeholder={t('kluby.fields.placeholderKolor_stroju')}
                    onChange={this.handleChange}
                    value={this.state.klub.Kolor_stroju}
                />

                <div className="form-buttons">
                    <input type="submit" className="form-button-submit" value={pageButton}/>
                    <Link to={`/kluby`} className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </form>
        }

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

const withRouter = WrappedComponent => props => {
    const params = useParams(); // <-- these are the path params
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
            // etc...
        />
    );
};

export default withTranslation() (withRouter(KlubyForm));