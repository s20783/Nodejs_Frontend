import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from '../../helpers/dateFormat'
import {useTranslation} from "react-i18next";

function WynikiDetailsData(props) {
    const {t} = useTranslation();
    const mecz = props.data
    return (
        <>
            <label htmlFor="Gospodarz">{t('wyniki.fields.Gospodarz')}: </label>
            <input type="text" name="Gospodarz" id="Gospodarz" placeholder="" disabled
                   value={mecz.GospodarzNazwa}/>
            <span id="errorGospodarz" className="errors-text"/>

            <label htmlFor="Wynik">{t('wyniki.fields.Wynik')}: </label>
            <input type="text" name="Wynik" id="Wynik" placeholder="" disabled
                   value={mecz.Wynik}/>
            <span id="errorWynik" className="errors-text"/>

            <label htmlFor="Gosc">{t('wyniki.fields.Gosc')}: </label>
            <input type="text" name="Gosc" id="Gosc" placeholder="" disabled
                   value={mecz.GoscNazwa}/>
            <span id="errorGosc" className="errors-text"/>

            <label htmlFor="Data_meczu">{t('wyniki.fields.Data_meczu')}: </label>
            <input type="text" name="Data_meczu" id="Data_meczu" placeholder="" disabled
                   value={mecz.Data_meczu ? getFormattedDate(mecz.Data_meczu) + " " + mecz.Data_meczu.split("T")[1].split(".")[0] : "-"}/>
            <span id="errorData_zakonczenia" className="errors-text"/>

            <label htmlFor="Nazwa_sezonu">{t('wyniki.fields.Sezon')}: </label>
            {/*<a className="form-text"><Link to={`/sezony/details/${mecz.ID_sezon}`}>{mecz.Nazwa_sezonu}</Link></a>*/}
            <input type="text" name="Nazwa_sezonu" id="Nazwa_sezonu" placeholder="" disabled
                   value={mecz.Nazwa_sezonu}/>
            <span id="errorNazwa_sezonu" className="errors-text"/>
        </>
    )
}

export default WynikiDetailsData