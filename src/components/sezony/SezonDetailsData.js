import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from '../../helpers/dateFormat'
import {useTranslation} from "react-i18next";

function SezonDetailsData(props) {
    const {t} = useTranslation();
    const sezon = props.sezon
    return (
        <>
            <label htmlFor="Nazwa_sezonu">{t('sezony.fields.Nazwa_sezonu')}: </label>
            <input type="text" name="Nazwa_sezonu" id="Nazwa_sezonu" placeholder="" disabled
                   value={sezon.Nazwa_sezonu}/>
            <span id="errorNazwa_sezonu" className="errors-text"/>

            <label htmlFor="Data_rozpoczecia">{t('sezony.fields.Data_rozpoczecia')}: </label>
            <input type="text" name="Data_rozpoczecia" id="Data_rozpoczecia" placeholder="" disabled
                   value={sezon.Data_rozpoczecia ? getFormattedDate(sezon.Data_rozpoczecia) : "-"}/>
            <span id="errorData_rozpoczecia" className="errors-text"/>

            <label htmlFor="Data_zakonczenia">{t('sezony.fields.Data_zakonczenia')}: </label>
            <input type="text" name="Data_zakonczenia" id="Data_zakonczenia" placeholder="" disabled
                   value={sezon.Data_zakonczenia ? getFormattedDate(sezon.Data_zakonczenia) : "-"}/>
            <span id="errorData_zakonczenia" className="errors-text"/>
        </>
    )
}

export default SezonDetailsData