import React from "react";
import {getWynikiList} from "../../api/wynikiApiCalls";
import WynikiListTable from "./WynikiListTable";
import {withTranslation} from "react-i18next";

class WynikiList extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            wyniki: []
        }
    }
    componentDidMount() {
        getWynikiList()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        wyniki: data
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
        const {t} = this.props
        const {error, isLoaded, wyniki } = this.state
        let content;

        if(error) {
            content = <p>{t('other.error')}: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <WynikiListTable data={wyniki} />
        }

        return (
            <main>
                <h2>{t('wyniki.form.list.pageTitle')}</h2>
                <p>{t('wyniki.form.list.text')}</p>
                {content}
            </main>
        )
    }
}

export default withTranslation() (WynikiList);