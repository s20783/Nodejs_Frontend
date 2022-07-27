import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated, isAuthenticated2} from "../../helpers/authHelper";

function ZawodnicyListTableRow(props) {
    const {t} = useTranslation();
    const zawodnik = props.zawodnikData
    return (
        <tr key={zawodnik.ID_zawodnik}>
            <td>{zawodnik.Imie}</td>
            <td>{zawodnik.Nazwisko}</td>
            <td>{zawodnik.Pozycja}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/zawodnicy/details/${zawodnik.ID_zawodnik}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated2(zawodnik.ID_zawodnik) &&
                    <li><Link to={`/zawodnicy/edit/${zawodnik.ID_zawodnik}`}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAdmin() &&
                    <li><Link to={`/zawodnicy/delete/${zawodnik.ID_zawodnik}`}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                    }
                </ul>
            </td>
        </tr>

    )
}

export default ZawodnicyListTableRow
