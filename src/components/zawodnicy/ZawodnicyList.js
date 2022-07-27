import React from "react";
import {getZawodnicyList} from "../../api/zawodnicyApiCalls";
import ZawodnicyListTable from "./ZawodnicyListTable";
import { withTranslation} from "react-i18next";

class ZawodnicyList extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            zawodnicy: []
        }
    }
    componentDidMount() {
        getZawodnicyList()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        zawodnicy: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {t} = this.props;
        const {error, isLoaded, zawodnicy } = this.state
        let content;

        if(error) {
            content = <p>Błąd: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <ZawodnicyListTable zawodnicy={zawodnicy} />
        }

        return (
            <main>
                <h2>{t('zawodnicy.form.list.pageTitle')}</h2>
                <p>{t('zawodnicy.form.list.text')}</p>
                {content}
            </main>
        )
    }
}

export default withTranslation() (ZawodnicyList);