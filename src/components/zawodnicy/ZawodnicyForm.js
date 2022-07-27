import React from "react";
import {Link, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {Navigate} from "react-router";
import {addZawodnik, getZawodnikInfo, updateZawodnik} from "../../api/zawodnicyApiCalls";
import FormInput from "../../helpers/FormInput";
import {withTranslation} from "react-i18next";
import {checkTextLength} from "../../helpers/checkTextLength";
import {isAuthenticated2} from "../../helpers/authHelper";

class ZawodnicyForm extends React.Component {
    constructor(props) {
        super(props);

        const id = this.props.params.zawodnikID
        const currentMode = id ? formMode.EDIT : formMode.NEW

        this.state = {
            ID_zawodnik: id,
            isLoaded: false,
            zawodnik: {
                Imie: '',
                Nazwisko: '',
                Pozycja: ''
            },
            errors: {
                Imie: '',
                Nazwisko: '',
                Pozycja: ''
            },
            formMode: currentMode,
            redirect: false,
            error: null,
            message: null
        }
    }

    fetchZawodnikDetails = () => {
        getZawodnikInfo(this.state.ID_zawodnik)
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
                            zawodnik: {
                                Imie: data.Imie,
                                Nazwisko: data.Nazwisko,
                                Pozycja: data.Pozycja
                            },
                            ID_zawodnik: data.ID_zawodnik,
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
            this.fetchZawodnikDetails()
        } else {
            this.setState({
                isLoaded: true,
            })
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const zawodnik = {...this.state.zawodnik}
        zawodnik[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            zawodnik: zawodnik,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Imie') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if (!checkTextLength(fieldValue, 40)) {
                    errorMessage = `${t('validation.max40')}`
                }
            }
        }
        if (fieldName === 'Nazwisko') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if (!checkTextLength(fieldValue, 40)) {
                    errorMessage = `${t('validation.max40')}`
                }
            }
        }
        if (fieldName === 'Pozycja') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else {
                if (!checkTextLength(fieldValue, 20)) {
                    errorMessage = `${t('validation.max20')}`
                }
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const zawodnik = this.state.zawodnik
        const errors = this.state.errors
        for (const fieldName in zawodnik) {
            const fieldValue = zawodnik[fieldName]
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
                emp = this.state.zawodnik,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addZawodnik(emp)
            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp)
                const id = this.state.ID_zawodnik
                promise = updateZawodnik(id, emp)
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego zawodnika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Navigate to={{
                    pathname: "/zawodnicy/",
                    state: {
                        //notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? `${t("zawodnicy.form.add.pageTitle")}` : `${t("zawodnicy.form.edit.pageTitle")}`
        const pageButton = this.state.formMode === formMode.NEW ? `${t("form.actions.add")}` : `${t("form.actions.save_changes")}`

        //const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let content, pozycjaName;
        pozycjaName = 'error' + "Pozycja"[0].toUpperCase() + "Pozycja".slice(1)
        console.log(pozycjaName)
        if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <form className="form" onSubmit={this.handleSubmit} noValidate>
                <FormInput
                    type="text"
                    label={t('zawodnicy.fields.Imie')}
                    required
                    error={this.state.errors.Imie}
                    name="Imie"
                    placeholder={t('zawodnicy.fields.placeholderImie')}
                    onChange={this.handleChange}
                    value={this.state.zawodnik.Imie}
                />
                <FormInput
                    type="text"
                    label={t('zawodnicy.fields.Nazwisko')}
                    required
                    error={this.state.errors.Nazwisko}
                    name="Nazwisko"
                    placeholder={t('zawodnicy.fields.placeholderNazwisko')}
                    onChange={this.handleChange}
                    value={this.state.zawodnik.Nazwisko}
                />

                <label form="Pozycja">{t('zawodnicy.fields.Pozycja')}: <span
                    class="symbol-required">*</span></label>
                <select name="Pozycja" id="Pozycja" onChange={this.handleChange} required
                        className={this.state.errors.Pozycja === '' ? '' : 'error-input'}
                >
                    <option value="">{t('zawodnicy.fields.PositionSelect')}</option>
                    <option selected={this.state.zawodnik.Pozycja === "Bramkarz"} value="Bramkarz" label="Bramkarz"/>
                    <option selected={this.state.zawodnik.Pozycja === "Obrońca"} value="Obrońca" label="Obrońca"/>
                    <option selected={this.state.zawodnik.Pozycja === "Pomocnik"} value="Pomocnik" label="Pomocnik"/>
                    <option selected={this.state.zawodnik.Pozycja === "Napastnik"} value="Napastnik" label="Napastnik"/>
                </select>
                <span id={pozycjaName} className="errors-text">{this.state.errors.Pozycja}</span>


                <div className="form-buttons">
                    <input type="submit" className="form-button-submit" value={pageButton}/>
                    <Link to={`/zawodnicy`} className="form-button-cancel">{t('form.actions.return')}</Link>
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

export default withTranslation()(withRouter(ZawodnicyForm));