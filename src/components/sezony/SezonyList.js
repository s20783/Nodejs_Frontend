import React from "react";
import {getSezonyList} from "../../api/sezonyApiCalls";
import SezonyListTable from "./SezonyListTable";
import {withTranslation} from "react-i18next";

class SezonyList extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            sezony: []
        }
    }
    componentDidMount() {
        getSezonyList()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        sezony: data
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
        const {error, isLoaded, sezony } = this.state
        let content;

        if(error) {
            content = <p>Błąd: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <SezonyListTable data={sezony} />
        }

        return (
            <main>
                <h2>{t('sezony.form.list.pageTitle')}</h2>
                {content}
            </main>
        )
    }
}

export default withTranslation() (SezonyList);