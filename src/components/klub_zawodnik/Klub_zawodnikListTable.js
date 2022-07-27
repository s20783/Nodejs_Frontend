import React from 'react';
import {Link} from "react-router-dom";
import Klub_zawodnikListTableRow from "./Klub_zawodnikListTableRow";
import { useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

function Klub_zawodnikListTable(props){
    const {t} = useTranslation();
    const list = props.data
    return (
        <>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('kluby.fields.Nazwa')}</th>
                    <th>{t('kluby.fields.Skrot')}</th>
                    <th>{t('zawodnicy.fields.Imie')}</th>
                    <th>{t('zawodnicy.fields.Nazwisko')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                { list.map( klub_zawodnik => (
                    <Klub_zawodnikListTableRow klub_zawodnikData={klub_zawodnik}/>
                ))}
                </tbody>
            </table>

            <form className="form">
                {isAdmin() &&
                <div className="form-buttons">
                    <Link to={`/klub_zawodnik/add`}
                          className="form-button-submit">{t('klub_zawodnik.form.list.btnLabel')}</Link>
                </div>
                }
            </form>
        </>
    )
}

export default Klub_zawodnikListTable
