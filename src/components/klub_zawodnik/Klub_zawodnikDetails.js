import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getKlub_zawodnikDetails} from "../../api/klub_zawodnikApiCalls";
import Klub_zawodnikList from "./Klub_zawodnikList";
import Klub_zawodnikDetailsData from "./Klub_zawodnikDetailsData";
import {withTranslation} from "react-i18next";

// import { getFormattedDate } from '../../helpers/dateHelper'

class Klub_zawodnikDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ID_klub: this.props.params.klubID,
            ID_zawodnik: this.props.params.zawodnikID,
            klub_zawodnik: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }
    componentDidMount() {
        getKlub_zawodnikDetails(this.state.ID_klub, this.state.ID_zawodnik)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(this.state.ID_klub + "   " + this.state.ID_zawodnik)
                    if(data.message){
                        this.setState({
                            klub_zawodnik: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            klub_zawodnik: data.details,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
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
        const {klub_zawodnik, error, isLoaded, message} = this.state
        let content;
        console.log(klub_zawodnik)
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t("other.loading")}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <Klub_zawodnikDetailsData data={klub_zawodnik} />
        }
        return (
            <main>
                <h2>{t("klub_zawodnik.form.details.pageTitle")}</h2>
                {content}
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation() (withRouter(Klub_zawodnikDetails));