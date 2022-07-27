import React from "react";
import {Link, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {Navigate} from "react-router";
import FormInput from "../../helpers/FormInput";
import {checkDate} from "../../helpers/checkDate";
import {addWynik, getWynikiAdd} from "../../api/wynikiApiCalls";
import { withTranslation } from "react-i18next";

class WynikiFormAdd extends React.Component {
    constructor(props) {
        super(props);

       // const id = this.props.params.wynikID
        const currentMode = formMode.NEW
            //id ? formMode.EDIT : formMode.NEW

        this.state = {
            ID_wynik: '',
            isLoaded: false,
            wynik: {
                Gospodarz: '',
                Gosc: '',
                Data_meczu: '',
                Sezon: ''
            },
            kluby: '',
            sezony: '',
            errors: {
                Gospodarz: '',
                Gosc: '',
                Data_meczu: '',
                Sezon: ''
            },
            formMode: currentMode,
            redirect: false,
            error: null,
            message: null
        }
    }

    fetchWynikAdd = () => {
        getWynikiAdd()
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            // wynik: {
                            //     Gospodarz: data.sezon.Nazwa_sezonu,
                            //     Gosc: data.sezon.Data_rozpoczecia,
                            //     Data_zakonczenia: data.sezon.Data_zakonczenia
                            // },
                            kluby: data.kluby,
                            sezony: data.sezony,
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
            // this.fetchWynikDetails()
        } else {
            this.fetchWynikAdd()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const wynik = {...this.state.wynik}
        wynik[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            wynik: wynik,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Gospodarz') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        if (fieldName === 'Gosc') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            } else if (fieldValue == this.state.wynik.Gospodarz){
                errorMessage = `${t('validation.klub')}`
            }
        }
        if (fieldName === 'Data_meczu') {
            if (!fieldValue) {

            } else if (!checkDate(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
        }
        if (fieldName === 'Sezon') {
            if (!fieldValue) {
                errorMessage = `${t('validation.fieldRequired')}`
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const wynik = this.state.wynik
        const errors = this.state.errors
        for (const fieldName in wynik) {
            const fieldValue = wynik[fieldName]
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
                emp = this.state.wynik,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                console.log(emp)
                promise = addWynik(emp)
            } else if (currentFormMode === formMode.EDIT) {
                //const id = this.state.ID_sezon
                //promise = updateSezon(id, emp)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                this.setState({redirect: true})
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            //console.log(data)
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
        const {redirect, isLoaded, kluby, sezony} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego pracownika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Navigate to={{
                    pathname: "/wyniki/",
                    state: {
                        //notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? `${t("wyniki.form.add.pageTitle")}` : `${t("wyniki.form.edit.pageTitle")}`
        const pageButton = this.state.formMode === formMode.NEW ? `${t("form.actions.add")}` : `${t("form.actions.save_changes")}`

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let content;
        if (!isLoaded) {
            content = <p>Ładowanie danych...</p>
        } else {
            content = <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="Gospodarz">{t('wyniki.fields.Gospodarz')}: <span
                    className="symbol-required">*</span></label>
                <select datatype="number" name="Gospodarz" id="Gospodarz" onChange={this.handleChange}
                        className={this.state.errors.Gospodarz === '' ? '' : 'error-input'}>
                    <option value="">{t('wyniki.fields.KlubSelect')}</option>
                    {kluby.map(k => (
                        <option selected={this.state.wynik.Gospodarz === k.ID_klub}
                                value={k.ID_klub} label={k.Nazwa + " - (" + k.Skrot + ")"}/>
                    ))}
                </select>
                <span id="errorGospodarz" className="errors-text">{this.state.errors.Gospodarz}</span>

                <label htmlFor="Gosc">{t('wyniki.fields.Gosc')}: <span
                    className="symbol-required">*</span></label>
                <select datatype="number" name="Gosc" id="Gosc" onChange={this.handleChange}
                        className={this.state.errors.Gosc === '' ? '' : 'error-input'}>
                    <option value="">{t('wyniki.fields.KlubSelect')}</option>
                    {kluby.map(k => (
                        <option selected={this.state.wynik.Gosc === k.ID_klub}
                                value={k.ID_klub} label={k.Nazwa + " - (" + k.Skrot + ")"}/>
                    ))}
                </select>
                <span id="errorGosc" className="errors-text">{this.state.errors.Gosc}</span>

                <FormInput
                    type="datetime-local"
                    label={t('wyniki.fields.Data_meczu')}
                    required
                    error={this.state.errors.Data_meczu}
                    name="Data_meczu"
                    placeholder=""
                    onChange={this.handleChange}
                    value={this.state.wynik.Data_meczu}
                />

                <label htmlFor="Sezon">{t('wyniki.fields.Sezon')}: <span
                    className="symbol-required">*</span></label>
                <select datatype="number" name="Sezon" id="Sezon" onChange={this.handleChange}
                        className={this.state.errors.Sezon === '' ? '' : 'error-input'}>
                    <option value="">{t('wyniki.fields.SezonSelect')}</option>
                    {sezony.map(s => (
                        <option selected={this.state.wynik.Sezon === s.ID_sezon}
                                value={s.ID_sezon} label={s.Nazwa_sezonu}/>
                    ))}
                </select>
                <span id="errorSezon" className="errors-text">{this.state.errors.Sezon}</span>

                {/*<FormInput*/}
                {/*    type="date"*/}
                {/*    label="Data rozpoczęcia"*/}
                {/*    required*/}
                {/*    error={this.state.errors.Data_rozpoczecia}*/}
                {/*    name="Data_rozpoczecia"*/}
                {/*    placeholder=""*/}
                {/*    onChange={this.handleChange}*/}
                {/*    value={this.state.sezon.Data_rozpoczecia}*/}
                {/*/>*/}
                {/*<FormInput*/}
                {/*    type="date"*/}
                {/*    label="Data zakończenia"*/}
                {/*    required*/}
                {/*    error={this.state.errors.Data_zakonczenia}*/}
                {/*    name="Data_zakonczenia"*/}
                {/*    placeholder=""*/}
                {/*    onChange={this.handleChange}*/}
                {/*    value={this.state.sezon.Data_zakonczenia}*/}
                {/*/>*/}

                <div className="form-buttons">
                    <input type="submit" className="form-button-submit" value={pageButton}/>
                    <Link to={`/wyniki`} className="form-button-cancel">{t('form.actions.return')}</Link>
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

export default withTranslation() (withRouter(WynikiFormAdd));