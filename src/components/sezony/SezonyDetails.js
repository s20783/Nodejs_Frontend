import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getSezonyDetails, getSezonyTable} from "../../api/sezonyApiCalls";
import SezonDetailsData from "./SezonDetailsData";
import SezonResultsTable from "./SezonResultsTable";
import SezonGoleTable from "./SezonPlayerTable";
import SezonPlayerTable from "./SezonPlayerTable";
// import { getFormattedDate } from '../../helpers/dateHelper'
import {withTranslation} from "react-i18next";
import {isAdmin} from "../../helpers/authHelper";

class SezonyDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ID_sezon: this.props.params.sezonID,
            sezon: null,
            table: null,
            gole: null,
            asysty: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        getSezonyDetails(this.state.ID_sezon)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    if (data.message) {
                        this.setState({
                            sezon: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            sezon: data.sezon,
                            table: data.stats,
                            gole: data.gole,
                            asysty: data.asysty,
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
        const {sezon, table, gole, asysty, error, isLoaded, message, ID_sezon} = this.state
        let content, contentTable, contentGole, contentAsysty;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else if (!table) {
            contentTable = <p>{t('sezony.other.scoresTable')}</p>
            contentGole = <p>{t('sezony.other.goalsTable')}</p>
            contentAsysty = <p>{t('sezony.other.assistsTable')}</p>
        } else if (!asysty && !gole) {
            content = <SezonDetailsData sezon={sezon}/>
            contentTable = <SezonResultsTable table={table}/>
            contentGole = <p>{t('sezony.other.goalsTable')}</p>
            contentAsysty = <p>{t('sezony.other.assistsTable')}</p>
        } else if (!asysty) {
            content = <SezonDetailsData sezon={sezon}/>
            contentTable = <SezonResultsTable table={table}/>
            contentGole = <SezonPlayerTable text={t('sezony.fields.Gole')} data={gole}/>
            contentAsysty = <p>{t('sezony.other.assistsTable')}</p>
        } else {
            content = <SezonDetailsData sezon={sezon}/>
            contentTable = <SezonResultsTable table={table}/>
            contentGole = <SezonPlayerTable text={t('sezony.fields.Gole')} data={gole}/>
            contentAsysty = <SezonPlayerTable text={t('sezony.fields.Asysty')} data={asysty}/>
        }
        return (
            <main>
                <h2>{t('sezony.form.details.pageTitle')}</h2>
                <React.Fragment>
                    <form className="form" method="post" noValidate>
                        {content}
                        {contentTable}
                        <p></p>
                        <p></p>
                        {contentGole}
                        <p></p>
                        <p></p>
                        {contentAsysty}
                        <div className="form-buttons">
                            {isAdmin() &&
                            <Link to={`/sezony/edit/${ID_sezon}`}
                                  className="form-button-edit">{t('form.actions.edit')}</Link>
                            }
                                <Link to={`/sezony`} className="form-button-cancel">{t('form.actions.return')}</Link>
                        </div>
                    </form>
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

export default withTranslation() (withRouter(SezonyDetails));