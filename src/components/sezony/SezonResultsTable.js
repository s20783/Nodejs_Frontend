import React from 'react';
import {useTranslation} from "react-i18next";

function SezonResultsTable(props) {
    const {t} = useTranslation();
    const table = props.table
    let i = 1;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>#</th>
                <th>{t('sezony.fields.Klub')}</th>
                <th>{t('sezony.fields.Mecze')}</th>
                <th>{t('sezony.fields.Punkty')}</th>
                <th>{t('sezony.fields.Rezultaty')}</th>
                <th>{t('sezony.fields.Bramki')}</th>
            </tr>
            </thead>
            <tbody>
            {table.info.map(info => (
                <tr>
                    <td>{i++}</td>
                    <td>{info.Nazwa}</td>
                    <td>{info.Played}</td>
                    <td>{info.Punkty}</td>
                    <td>{info.Z}-{info.R}-{info.P}</td>
                    <td>{info.GoleStrzelone}-{info.GoleStracone}  {info.GoleRoznica}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default SezonResultsTable