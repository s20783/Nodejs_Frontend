import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from '../../helpers/dateFormat'
import {useTranslation} from "react-i18next";
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

function Klub_zawodnikDetailsData(props) {
    const {t} = useTranslation();
    const data = props.data
    return (
        <React.Fragment>
            <form className="form" method="post" action="" noValidate>
                <p>{t('klub_zawodnik.fields.Klub')}: </p>
                <p><Link to={`/kluby/details/${data.ID_klub}`}>{data.Nazwa}</Link></p>
                <span id="errorKlub" className="errors-text"/>

                <p>{t('klub_zawodnik.fields.Zawodnik')}: </p>
                <p><Link
                    to={`/zawodnicy/details/${data.ID_zawodnik}`}>{data.Imie + " " + data.Nazwisko + " - " + data.Pozycja}</Link>
                </p>
                <span id="errorZawodnik" className="errors-text"/>


                <table className="table-list">
                    <thead>
                    <tr>
                        <th>{t('klub_zawodnik.fields.Numer')}</th>
                        <th>{t('klub_zawodnik.fields.Od_kiedy')}</th>
                        <th>{t('klub_zawodnik.fields.Do_kiedy')}</th>
                        {isAuthenticated() &&
                        <th>{t('list.actions.title')}</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {data.info.map(info => (
                        <tr>
                            <td>{info.Numer}</td>
                            <td>{info.Od_kiedy ? getFormattedDate(info.Od_kiedy) : "-"}</td>
                            <td>{info.Do_kiedy ? getFormattedDate(info.Do_kiedy) : "-"}</td>
                            {isAuthenticated() && <td>
                                <ul className="list-actions">
                                    <li><Link to={`/klub_zawodnik/edit/${info.ID_klub_zawodnik}`}
                                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                                    {isAdmin() && <li><Link to={`/klub_zawodnik/delete/${info.ID_klub_zawodnik}`}
                                                            className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                                    </li>
                                    }
                                </ul>
                            </td>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="form-buttons">
                    {/*<Link to={`/klub_zawodnik/edit/${data.ID_klub}`} className="form-button-edit">Edytuj</Link>*/}
                    <Link to={`/klub_zawodnik`} className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Klub_zawodnikDetailsData