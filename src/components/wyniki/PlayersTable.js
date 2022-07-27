import React from 'react';
import SezonPlayerTable from "../sezony/SezonPlayerTable";
import {useTranslation} from "react-i18next";

function PlayersTable(props) {
    const players = props.data
    let i = 1;
    const {t} = useTranslation();
    return (
        <>
            <h3>{props.text}</h3>
            <table className="table-list" id="table1">
                <thead>
                <tr>
                    <th>#</th>
                    <th>{t('zawodnicy.fields.Imie')}</th>
                    <th>{t('zawodnicy.fields.Nazwisko')}</th>
                    <th>{t('klub_zawodnik.fields.Numer')}</th>
                    <th>{t('zawodnicy.fields.Pozycja')}</th>
                    <th>{t('wyniki.fields.Gole')}</th>
                    <th>{t('wyniki.fields.Asysty')}</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr>
                        <td>{i++}</td>
                        <td>{player.Imie}</td>
                        <td>{player.Nazwisko}</td>
                        <td>{player.Numer}</td>
                        <td>{player.Pozycja}</td>
                        <td>
                            {player.Gole}
                        </td>
                        <td>
                            {player.Asysty}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default PlayersTable