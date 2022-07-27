import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getWynikiDetails} from "../../api/wynikiApiCalls";
import PlayersTable from "./PlayersTable";
import WynikiDetailsData from "./WynikiDetailsData";
// import { getFormattedDate } from '../../helpers/dateHelper'
import {withTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

class WynikiDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID_mecz: this.props.params.meczID,
            mecze: null,
            kluby: null,
            gospodarze: null,
            goscie: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        getWynikiDetails(this.state.ID_mecz)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    if (data.message) {
                        this.setState({
                            mecze: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            mecze: data.mecze,
                            kluby: data.kluby,
                            gospodarze: data.gospodarze,
                            goscie: data.goscie,
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
        const {mecze, kluby, goscie, gospodarze, error, isLoaded, message, ID_mecz} = this.state
        let content, contentGospodarz, contentGoscie;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else if(!gospodarze || !goscie){
            content = <WynikiDetailsData data={mecze}/>
            contentGospodarz = <><h3>Gospodarze</h3><p>Brak zawodników do wyświetlenia...</p></>
            contentGoscie = <><h3>Goscie</h3><p>Brak zawodników do wyświetlenia...</p></>
        } else {
            content = <WynikiDetailsData data={mecze}/>
            contentGospodarz = <PlayersTable text={t('wyniki.fields.Gospodarze')} data={gospodarze}/>
            contentGoscie = <PlayersTable text={t('wyniki.fields.Goscie')} data={goscie}/>
        }
        return (
            <main>
                <h2>{t('wyniki.form.details.pageTitle')}</h2>
                <React.Fragment>
                    <form className="form" noValidate>
                        {content}
                        <div className="form-buttons">
                            {isAdmin() &&
                            <Link to={`/wyniki/edit/${ID_mecz}`}
                                  className="form-button-edit">{t('form.actions.edit')}</Link>
                            }
                                <Link to={`/wyniki`} className="form-button-cancel">{t('form.actions.return')}</Link>
                        </div>
                    </form>
                    {contentGospodarz}
                    <p></p>
                    {contentGoscie}
                </React.Fragment>
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

export default withTranslation() (withRouter(WynikiDetails));