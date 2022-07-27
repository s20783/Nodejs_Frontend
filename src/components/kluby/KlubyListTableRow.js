import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated, isKapitan} from "../../helpers/authHelper";

function KlubyListTableRow(props) {
    const {t} = useTranslation();
    const klub = props.klubData
    return (
        <tr key={klub.ID_klub}>
            <td>{klub.Nazwa}</td>
            <td>{klub.Skrot}</td>
            <td>{klub.Kolor_stroju}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/kluby/details/${klub.ID_klub}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isKapitan(klub.ID_klub) &&
                    <li><Link to={`/kluby/edit/${klub.ID_klub}`}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAdmin() &&
                    <li><Link to={`/kluby/delete/${klub.ID_klub}`}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>

    )
}

export default KlubyListTableRow
