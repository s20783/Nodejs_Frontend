import React from 'react';
import {Link} from "react-router-dom";
import WynikiListTableRow from "./WynikiListTableRow";
import {useTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

function Klub_zawodnikListTable(props){
    const {t} = useTranslation();
    const list = props.data
    return (
        <>
            <table class="table-list">
                <thead>
                <tr>
                    <th>{t('wyniki.fields.Data_meczu')}</th>
                    <th>{t('wyniki.fields.Gospodarze')}</th>
                    <th><b>{t('wyniki.fields.Wynik')}</b></th>
                    <th>{t('wyniki.fields.Goscie')}</th>
                    <th>{t('wyniki.fields.Sezon')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                { list.map( wynik => (
                    <WynikiListTableRow data={wynik} key={wynik.ID_mecz}/>
                ))}
                </tbody>
            </table>

            <form class="form">
                {isAdmin() &&
                <div class="form-buttons">
                    <Link to={`/wyniki/add`} className="form-button-submit">{t('wyniki.form.list.btnLabel')}</Link>
                </div>
                }
            </form>
        </>
    )
}

export default Klub_zawodnikListTable
