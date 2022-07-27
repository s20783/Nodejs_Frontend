import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from '../../helpers/dateFormat'
import {useTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

function KlubyDetailsData(props) {
    const {t} = useTranslation();
    const klub = props.klub
    return (
        <React.Fragment>
            <form className="form" method="post" action="" noValidate>
                <label htmlFor="Nazwa">{t('kluby.fields.Nazwa')}: </label>
                <input type="text" name="Nazwa" id="Nazwa" placeholder="" disabled
                       value={klub.Nazwa}/>
                <span id="errorNazwa" className="errors-text"/>

                <label htmlFor="Skrot">{t('kluby.fields.Skrot')}: </label>
                <input type="text" name="Skrot" id="Skrot" placeholder="" disabled
                       value={klub.Skrot}/>
                <span id="errorSkrot" className="errors-text"/>

                <label htmlFor="Kolor_stroju">{t('kluby.fields.Kolor_stroju')}: </label>
                <input type="text" name="Kolor_stroju" id="Kolor_stroju" placeholder="" disabled
                       value={klub.Kolor_stroju}/>
                <span id="errorKolor_stroju" className="errors-text"/>

                <table className="table-list">
                    <thead>
                    <tr>
                        <th>{t('zawodnicy.fields.Imie')}</th>
                        <th>{t('zawodnicy.fields.Nazwisko')}</th>
                        <th>{t('zawodnicy.fields.Pozycja')}</th>
                        <th>{t('klub_zawodnik.fields.Numer')}</th>
                        <th>{t('klub_zawodnik.fields.Od_kiedy')}</th>
                        <th>{t('klub_zawodnik.fields.Do_kiedy')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {klub.info.map(info => (
                        <tr>
                            <td>{info.Imie}</td>
                            <td>{info.Nazwisko}</td>
                            <td>{info.Pozycja}</td>
                            <td>{info.Numer}</td>
                            <td>{info.Od_kiedy ? getFormattedDate(info.Od_kiedy) : "-"}</td>
                            <td>{info.Do_kiedy ? getFormattedDate(info.Do_kiedy) : "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="form-buttons">
                    {isAdmin() &&
                    <Link to={`/kluby/edit/${klub.ID_klub}`}
                          className="form-button-edit">{t('form.actions.edit')}</Link>
                    }
                    <Link to={`/kluby`} className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default KlubyDetailsData