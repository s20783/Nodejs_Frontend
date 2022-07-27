import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { withTranslation} from "react-i18next";

class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const  { i18n } = this.props
        console.log(i18n);
        i18n.changeLanguage(language, (err, t) => {
            if (err) {
                return console.log('Error when changing language', err);
            }
        });
    }

    render() {
        const {t} = this.props;
        return (
            <nav>
                {/*<button type="text" onClick={() => {this.props.setNavState('sezony')}} >aaaaaaaaaaaaaaaaa</button>*/}
                <ul>
                    <li><NavLink to='/' >{t('nav.main')}</NavLink></li>
                    <li><NavLink to="/kluby" >{t('nav.kluby')}</NavLink></li>
                    <li><NavLink to="/zawodnicy" >{t('nav.zawodnicy')}</NavLink></li>
                    <li><NavLink to="/klub_zawodnik" >{t('nav.klub_zawodnik')}</NavLink></li>
                    <li><NavLink to="/wyniki" >{t('nav.mecze')}</NavLink></li>
                    <li><NavLink to="/sezony" >{t('nav.sezony')}</NavLink></li>
                    <div className="lang">
                        <button onClick={() => {this.handleLanguageChange('pl')}} className="lang-button">PL</button>
                        <button onClick={() => {this.handleLanguageChange('en')}} className="lang-button">EN</button>
                    </div>
                </ul>
            </nav>
        )
    }
}

export default withTranslation() (Navigation);