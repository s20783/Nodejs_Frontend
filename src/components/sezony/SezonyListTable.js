import React from 'react';
import {Link} from "react-router-dom";
import SezonyListTableRow from "./SezonyListTableRow";
import {useTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

function Klub_zawodnikListTable(props) {
    const {t} = useTranslation();
    const list = props.data
    return (
        <>
            <table class="table-list">
                <thead>
                <tr>
                    <th>{t('sezony.fields.Nazwa_sezonu')}</th>
                    <th>{t('sezony.fields.Data_rozpoczecia')}</th>
                    <th>{t('sezony.fields.Data_zakonczenia')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {list.map(sezon => (
                    <SezonyListTableRow data={sezon} key={sezon.ID_sezon}/>
                ))}
                </tbody>
            </table>

            <form class="form">
                {isAdmin() &&
                <div class="form-buttons">
                    <Link to={`/sezony/add`} className="form-button-submit">{t('sezony.form.list.btnLabel')}</Link>
                </div>
                }
            </form>
        </>
    )
}

export default Klub_zawodnikListTable
