import React from 'react';
import {useTranslation} from "react-i18next";

function SezonPlayerTable(props) {
    const {t} = useTranslation();
    const table = props.data
    let i = 1;
    return (
        <>
        <table className="table-list">
            <thead>
            <tr>
                <th>#</th>
                <th>{t('zawodnicy.fields.Imie')}</th>
                <th>{t('zawodnicy.fields.Nazwisko')}</th>
                <th>{t('sezony.fields.Klub')}</th>
                <th>{props.text}</th>

            </tr>
            </thead>
            <tbody>
            {table.info.map(info => (
                <tr>
                    <td>{i++}</td>
                    <td>{info.Imie}</td>
                    <td>{info.Nazwisko}</td>
                    <td>{info.Klub}</td>
                    <td>{info.Value1}</td>
                </tr>
            ))}
            </tbody>
        </table>
            </>
    )
}

export default SezonPlayerTable