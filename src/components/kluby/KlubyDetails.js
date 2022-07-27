import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getKlubDetails} from '../../api/klubyApiCalls'
import KlubyDetailsData from "./KlubyDetailsData";
import { withTranslation} from "react-i18next";

// import { getFormattedDate } from '../../helpers/dateHelper'

class KlubyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID_klub: this.props.params.klubID,
            klub: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }
    componentDidMount() {
        getKlubDetails(this.state.ID_klub)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            klub: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            klub: data,
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
        const {klub, error, isLoaded, message} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <KlubyDetailsData klub={klub} />
        }
        return (
            <main>
                <h2>{t('kluby.form.details.pageTitle')}</h2>
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

export default withTranslation() (withRouter(KlubyDetails));