import React from "react";
import {getKlub_zawodnikList} from "../../api/klub_zawodnikApiCalls";
import Klub_zawodnikListTable from "./Klub_zawodnikListTable";
import { withTranslation } from "react-i18next";

class Klub_zawodnikList extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            kluby_zawodnicy: []
        }
    }
    componentDidMount() {
        getKlub_zawodnikList()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        kluby_zawodnicy: data
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
        const {error, isLoaded, kluby_zawodnicy } = this.state
        let content;

        if(error) {
            content = <p>Błąd: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
             content = <Klub_zawodnikListTable data={kluby_zawodnicy} />
        }

        return (
            <main>
                <h2>{t('klub_zawodnik.form.list.pageTitle')}</h2>
                {content}
            </main>
        )
    }
}

export default withTranslation() (Klub_zawodnikList);