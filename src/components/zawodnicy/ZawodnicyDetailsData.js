import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateFormat";
//import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function ZawodnicyDetailsData(props) {
    const {t} = useTranslation();
    const zawodnik = props.zawodnik
    return (

        <React.Fragment>
            <form className="form" method="post" action="" noValidate>
                <label htmlFor="Imie">{t('zawodnicy.fields.Imie')}: </label>
                <input type="text" name="Imie" id="Imie" placeholder="" disabled
                       value={zawodnik.Imie}/>
                <span id="errorNazwa" className="errors-text"/>

                <label htmlFor="Nazwisko">{t('zawodnicy.fields.Nazwisko')}: </label>
                <input type="text" name="Nazwisko" id="Nazwisko" placeholder="" disabled
                       value={zawodnik.Nazwisko}/>
                <span id="errorSkrot" className="errors-text"/>

                <label htmlFor="Pozycja">{t('zawodnicy.fields.Pozycja')}: </label>
                <input type="text" name="Pozycja" id="Pozycja" placeholder="" disabled
                       value={zawodnik.Pozycja}/>
                <span id="errorKolor_stroju" className="errors-text"/>

                <table className="table-list">
                    <thead>
                    <tr>
                        <th>{t('kluby.fields.Nazwa')}</th>
                        <th>{t('klub_zawodnik.fields.Numer')}</th>
                        <th>{t('klub_zawodnik.fields.Od_kiedy')}</th>
                        <th>{t('klub_zawodnik.fields.Do_kiedy')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    { zawodnik.info.map( info => (
                        <tr>
                            <td><Link to={`/kluby/details/${info.ID_klub}`}>{info.Nazwa}</Link></td>
                            <td>{info.Numer}</td>
                            <td>{info.Od_kiedy ? getFormattedDate(info.Od_kiedy) : "-"}</td>
                            <td>{info.Do_kiedy ? getFormattedDate(info.Do_kiedy) : "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="form-buttons">
                    {isAuthenticated() &&
                    <Link to={`/zawodnicy/edit/${zawodnik.ID_zawodnik}`}
                          className="form-button-edit">{t('form.actions.edit')}</Link>
                    }
                        <Link to={`/zawodnicy`} className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ZawodnicyDetailsData