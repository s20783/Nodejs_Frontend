import React from "react";
import {Link, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {Navigate} from "react-router";
import FormInput from "../../helpers/FormInput";
import {
    addKlub_zawodnik, getKlub_zawodnikAdd,
    getKlub_zawodnikEdit,
    updateKlub_zawodnik
} from "../../api/klub_zawodnikApiCalls";
import {validationNumberRange} from "../../helpers/validationNumberRange";
import {checkDate} from "../../helpers/checkDate";
import {checkIfBefore} from "../../helpers/checkIfBefore";
import {withTranslation} from "react-i18next";

class Klub_zawodnikForm extends React.Component {
    constructor(props) {
        super(props);

        const id = this.props.params.klub_zawodnikID
        const currentMode = id ? formMode.EDIT : formMode.NEW

        this.state = {
            ID_klub_zawodnik: id,
            isLoaded: false,
            klub_zawodnik: {
                Numer: '',
                Od_kiedy: '',
                Do_kiedy: '',
                ID_klub: '',
                ID_zawodnik: ''
            },
            kluby: '',
            zawodnicy: '',
            errors: {
                Numer: '',
                Od_kiedy: '',
                Do_kiedy: '',
                ID_klub: '',
                ID_zawodnik: '',
                kluby: ''
            },
            formMode: currentMode,
            redirect: false,
            error: null,
            message: null
        }
    }

    fetchKlub_zawodnikAdd = () => {
        getKlub_zawodnikAdd()
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
                            kluby: data.kluby,
                            zawodnicy: data.zawodnicy,
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
    fetchKlub_ZawodnikEdit = () => {
        getKlub_zawodnikEdit(this.state.ID_klub_zawodnik)
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
                            klub_zawodnik: {
                                Numer: data.details.Numer,
                                Od_kiedy: data.details.Od_kiedy,
                                Do_kiedy: data.details.Do_kiedy,
                                ID_klub: data.details.ID_klub,
                                ID_zawodnik: data.details.ID_zawodnik
                            },
                            kluby: data.kluby,
                            zawodnicy: data.zawodnicy,
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
            this.fetchKlub_ZawodnikEdit()
        } else {
            this.fetchKlub_zawodnikAdd()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const klub_zawodnik = {...this.state.klub_zawodnik}
        klub_zawodnik[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            klub_zawodnik: klub_zawodnik,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'ID_klub') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'ID_zawodnik') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'Numer') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else if (!validationNumberRange(fieldValue,1,99)) {
                errorMessage = `${t('validation.numberRange')}`
            }
        }
        if (fieldName === 'Od_kiedy') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else if (!checkDate(fieldValue)){
                errorMessage = `${t('validation.format')}`
            } else if (!checkIfBefore(fieldValue)){
                errorMessage = `${t('validation.date')}`
            }
        }
        if (fieldName === 'Do_kiedy') {
            if (fieldValue) {
                const Od_kiedy = this.state.klub_zawodnik.Od_kiedy
                if (!checkDate(fieldValue)){
                    errorMessage = `${t('validation.format')}`
                } else if(Od_kiedy > fieldValue) {
                    errorMessage = 'Nie może być wcześniejsza data niż w "Od kiedy"'
                }
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const zawodnik = this.state.klub_zawodnik
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
                emp = this.state.klub_zawodnik,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addKlub_zawodnik(emp)
            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp)
                const id = this.state.ID_klub_zawodnik
                promise = updateKlub_zawodnik(id, emp)
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
        const {redirect, isLoaded, klub_zawodnik, kluby, zawodnicy} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego zawodnika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Navigate to={{
                    pathname: "/klub_zawodnik/",
                    state: {
                        //notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? `${t("klub_zawodnik.form.add.pageTitle")}` : `${t("klub_zawodnik.form.edit.pageTitle")}`
        const pageButton = this.state.formMode === formMode.NEW ? `${t("form.actions.add")}` : `${t("form.actions.save_changes")}`

        //const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let content;
        if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <form className="form" onSubmit={this.handleSubmit} noValidate>

                <label for="ID_klub">{t('klub_zawodnik.fields.Klub')}: <span
                    class="symbol-required">*</span></label>
                <select datatype="number" name="ID_klub" id="ID_klub" onChange={this.handleChange}
                        className={this.state.errors.ID_klub === '' ? '' : 'error-input'}>
                    <option value="">{t('klub_zawodnik.fields.KlubSelect')}</option>
                    { kluby.map( k => (
                    <option selected={this.state.klub_zawodnik.ID_klub === k.ID_klub}
                            value={k.ID_klub} label={k.Nazwa + " - (" + k.Skrot + ")"}/>
                        ))}
                </select>
                <span id="errorKlub" className="errors-text">{this.state.errors.ID_klub}</span>


                <label htmlFor="ID_zawodnik">{t('klub_zawodnik.fields.Zawodnik')}: <span
                    className="symbol-required">*</span></label>
                <select datatype="number" name="ID_zawodnik" id="ID_zawodnik" onChange={this.handleChange}
                        className={this.state.errors.ID_zawodnik === '' ? '' : 'error-input'}>
                    <option value="">{t('klub_zawodnik.fields.ZawodnikSelect')}</option>
                    { zawodnicy.map(z => (
                        <option selected={this.state.klub_zawodnik.ID_zawodnik === z.ID_zawodnik}
                                value={z.ID_zawodnik} label={z.Imie + " " + z.Nazwisko + " (" + z.Pozycja + ")"}/>
                    ))}
                </select>
                <span id="errorZawodnik" className="errors-text">{this.state.errors.ID_zawodnik}</span>


                <FormInput
                    type="number"
                    label={t('klub_zawodnik.fields.Numer')}
                    required
                    error={this.state.errors.Numer}
                    name="Numer"
                    placeholder={t('klub_zawodnik.fields.placeholderNumer')}
                    onChange={this.handleChange}
                    value={this.state.klub_zawodnik.Numer}
                />
                <FormInput
                    type="date"
                    label={t('klub_zawodnik.fields.Od_kiedy')}
                    required
                    error={this.state.errors.Od_kiedy}
                    name="Od_kiedy"
                    placeholder=""
                    onChange={this.handleChange}
                    value={this.state.klub_zawodnik.Od_kiedy}
                />
                <FormInput
                    type="date"
                    label={t('klub_zawodnik.fields.Do_kiedy')}
                    error={this.state.errors.Do_kiedy}
                    name="Do_kiedy"
                    placeholder=""
                    onChange={this.handleChange}
                    value={this.state.klub_zawodnik.Do_kiedy}
                />

                <div className="form-buttons">
                    <input type="submit" className="form-button-submit" value={pageButton}/>
                    <Link to={`/klub_zawodnik`} className="form-button-cancel">{t('form.actions.return')}</Link>
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

export default withTranslation() (withRouter(Klub_zawodnikForm));