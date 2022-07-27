import React from "react";
import {Link, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {Navigate} from "react-router";
import FormInput from "../../helpers/FormInput";
import {addSezon, getSezonyDetails, updateSezon} from "../../api/sezonyApiCalls";
import { withTranslation} from "react-i18next";

class SezonyForm extends React.Component {
    constructor(props) {
        super(props);

        const id = this.props.params.sezonID
        const currentMode = id ? formMode.EDIT : formMode.NEW
        console.log(id)

        this.state = {
            ID_sezon: id,
            isLoaded: false,
            sezon: {
                Nazwa_sezonu: '',
                Data_rozpoczecia: '',
                Data_zakonczenia: ''
            },
            errors: {
                Nazwa_sezonu: '',
                Data_rozpoczecia: '',
                Data_zakonczenia: ''
            },
            formMode: currentMode,
            redirect: false,
            error: null,
            message: null
        }
    }

    fetchSezonDetails = () => {
        getSezonyDetails(this.state.ID_sezon)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        console.log(data.sezon.Data_rozpoczecia)
                        this.setState({
                            sezon: {
                                Nazwa_sezonu: data.sezon.Nazwa_sezonu,
                                Data_rozpoczecia: data.sezon.Data_rozpoczecia,
                                Data_zakonczenia: data.sezon.Data_zakonczenia
                            },
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
            this.fetchSezonDetails()
        } else {
            this.setState({
                isLoaded: true,
            })
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const sezon = {...this.state.sezon}
        sezon[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            sezon: sezon,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Nazwa_sezonu') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'Data_rozpoczecia') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'Data_zakonczenia') {
            const Data_rozpoczecia = this.state.sezon.Data_rozpoczecia
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else if (Data_rozpoczecia > fieldValue) {
                errorMessage = `${t('validation.date')}`
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const sezon = this.state.sezon
        const errors = this.state.errors
        for (const fieldName in sezon) {
            const fieldValue = sezon[fieldName]
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
                emp = this.state.sezon,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addSezon(emp)
            } else if (currentFormMode === formMode.EDIT) {
                const id = this.state.ID_sezon
                promise = updateSezon(id, emp)
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
                            console.log(data)
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
                <Navigate to={{
                    pathname: "/sezony/",
                    state: {
                        //notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? `${t("sezony.form.add.pageTitle")}` : `${t("sezony.form.edit.pageTitle")}`
        const pageButton = this.state.formMode === formMode.NEW ? `${t("form.actions.add")}` : `${t("form.actions.save_changes")}`
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let content;
        if (!isLoaded) {
            content = <p>Ładowanie danych...</p>
        } else {
            content = <form className="form" onSubmit={this.handleSubmit}>
                <FormInput
                    type="text"
                    label={t('sezony.fields.Nazwa_sezonu')}
                    required
                    error={this.state.errors.Nazwa_sezonu}
                    name="Nazwa_sezonu"
                    placeholder={t('sezony.fields.Nazwa_sezonu')}
                    onChange={this.handleChange}
                    value={this.state.sezon.Nazwa_sezonu}
                />
                <FormInput
                    type="date"
                    label={t('sezony.fields.Data_rozpoczecia')}
                    required
                    error={this.state.errors.Data_rozpoczecia}
                    name="Data_rozpoczecia"
                    placeholder={t('sezony.fields.Data_rozpoczecia')}
                    onChange={this.handleChange}
                    value={this.state.sezon.Data_rozpoczecia}
                />
                <FormInput
                    type="date"
                    label={t('sezony.fields.Data_zakonczenia')}
                    required
                    error={this.state.errors.Data_zakonczenia}
                    name="Data_zakonczenia"
                    placeholder={t('sezony.fields.Data_zakonczenia')}
                    onChange={this.handleChange}
                    value={this.state.sezon.Data_zakonczenia}
                />

                <div className="form-buttons">
                    <input type="submit" className="form-button-submit" value={pageButton}/>
                    <Link to={`/sezony`} className="form-button-cancel">{t('form.actions.return')}</Link>
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
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation() (withRouter(SezonyForm));