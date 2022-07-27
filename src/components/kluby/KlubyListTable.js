import React from 'react';
import KlubyListTableRow from "./KlubyListTableRow";
import {Link} from "react-router-dom";
import { useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

function KlubyListTable(props){
    const { t } = useTranslation();
    const list = props.kluby
    return (
        <>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('kluby.fields.Nazwa')}</th>
                    <th>{t('kluby.fields.Skrot')}</th>
                    <th>{t('kluby.fields.Kolor_stroju')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                { list.map( klub => (
                    <KlubyListTableRow klubData={klub} key={klub.ID_klub}/>
                ))}
                </tbody>
            </table>

            <form className="form">
                {isAdmin() &&
                <div className="form-buttons">
                    <Link to={`/kluby/add`} className="form-button-submit">{t('kluby.form.list.btnLabel')}</Link>
                </div>
                }
            </form>
        </>
    )
}

export default KlubyListTable
