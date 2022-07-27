import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateFormat";
import {useTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

function Kluby_zawodnikListTableRow(props) {
    const {t} = useTranslation();
    const wynik = props.data
    return (
        <tr key={wynik.ID_mecz}>
            <td>{wynik.Data_meczu ? getFormattedDate(wynik.Data_meczu) + " " + wynik.Data_meczu.split("T")[1].split(".")[0] : "-"}</td>
            <td>{wynik.Gospodarz}</td>
            <td><Link to={`/wyniki/details/${wynik.ID_mecz}`}
                      className="score-button">{wynik.Wynik === null ? '-:-' : wynik.Wynik}</Link></td>
            <td>{wynik.Gosc}</td>
            <td>{wynik.Sezon}</td>
            <td>
                <ul class="list-actions">
                    <li><Link to={`/wyniki/details/${wynik.ID_mecz}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAdmin() &&
                    <li><Link to={`/wyniki/edit/${wynik.ID_mecz}`}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAdmin() &&
                    <li><Link to={`/wyniki/delete/${wynik.ID_mecz}`}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>
    )
}

export default Kluby_zawodnikListTableRow
