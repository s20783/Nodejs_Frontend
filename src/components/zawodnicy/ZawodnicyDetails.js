import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getKlubDetails} from '../../api/klubyApiCalls'
import ZawodnicyDetailsData from "./ZawodnicyDetailsData";
import {getZawodnicyDetails} from "../../api/zawodnicyApiCalls";
// import { getFormattedDate } from '../../helpers/dateHelper'
import { withTranslation } from "react-i18next";

class ZawodnicyDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params.zawodnikID);
        this.state = {
            ID_zawodnik: this.props.params.zawodnikID,
            zawodnik: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }
    componentDidMount() {
        getZawodnicyDetails(this.state.ID_zawodnik)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            zawodnik: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            zawodnik: data,
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
        const {zawodnik, error, isLoaded, message} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ZawodnicyDetailsData zawodnik={zawodnik} />
        }
        return (
            <main>
                <h2>{t('zawodnicy.form.details.pageTitle')}</h2>
                {content}
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams(); // <-- these are the path params
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

export default withTranslation() (withRouter(ZawodnicyDetails));