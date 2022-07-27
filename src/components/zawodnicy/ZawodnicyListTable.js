import React from 'react';
import {Link} from "react-router-dom";
import ZawodnicyListTableRow from "./ZawodnicyListTableRow";
import { useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

function ZawodnicyListTable(props){
    const {t} = useTranslation();
    const list = props.zawodnicy
    return (
        <>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('zawodnicy.fields.Imie')}</th>
                    <th>{t('zawodnicy.fields.Nazwisko')}</th>
                    <th>{t('zawodnicy.fields.Pozycja')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                { list.map( zawodnik => (
                    <ZawodnicyListTableRow zawodnikData={zawodnik} key={zawodnik.ID_klub}/>
                ))}
                </tbody>
            </table>

            <form className="form">
                {isAdmin() &&
                <div className="form-buttons">
                    <Link to={`/zawodnicy/add`}
                          className="form-button-submit">{t('zawodnicy.form.list.btnLabel')}</Link>
                </div>
                }
            </form>
        </>
    )
}

export default ZawodnicyListTable
