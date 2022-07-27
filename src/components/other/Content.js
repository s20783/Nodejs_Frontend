import react from 'react';
import { useTranslation} from "react-i18next";

function MainContent(){
    const { t } = useTranslation();
    return (
        <main>
            <h2>{t('main.content')}</h2>
            <p>{t('main.text')}</p>
        </main>
    )
}

export default MainContent;
