import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Kluby_zawodnikListTableRow(props) {
    const { t } = useTranslation();
    const klub_zawodnik = props.klub_zawodnikData
    return (
        <tr key={klub_zawodnik.ID_klub_zawodnik}>
            <td>{klub_zawodnik.Nazwa}</td>
            <td>{klub_zawodnik.Skrot}</td>
            <td>{klub_zawodnik.Imie}</td>
            <td>{klub_zawodnik.Nazwisko}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/klub_zawodnik/details/${klub_zawodnik.ID_klub}/${klub_zawodnik.ID_zawodnik}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                </ul>
            </td>
        </tr>

    )
}

export default Kluby_zawodnikListTableRow
