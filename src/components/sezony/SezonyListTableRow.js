import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateFormat";
import {useTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

function Kluby_zawodnikListTableRow(props) {
    const {t} = useTranslation();
    const sezon = props.data
    return (
        <tr key={sezon.ID_klub_zawodnik}>
            <td>{sezon.Nazwa_sezonu}</td>
            <td>{sezon.Data_rozpoczecia ? getFormattedDate(sezon.Data_rozpoczecia) : "-"}</td>
            <td>{sezon.Data_zakonczenia ? getFormattedDate(sezon.Data_zakonczenia) : "-"}</td>
            <td>
                <ul class="list-actions">
                    <li><Link to={`/sezony/details/${sezon.ID_sezon}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAdmin() &&
                    <li><Link to={`/sezony/edit/${sezon.ID_sezon}`}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAdmin() &&
                    <li><Link to={`/sezony/delete/${sezon.ID_sezon}`}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>

    )
}

export default Kluby_zawodnikListTableRow
