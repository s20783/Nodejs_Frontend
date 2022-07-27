import { getKlubyList } from '../../api/klubyApiCalls';
import KlubyListTable from "./KlubyListTable";
import React from "react";
import { withTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

class KlubyList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            isLoaded: false,
            kluby: [],
            notice: ''
        }
    }
    componentDidMount() {
        getKlubyList()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        kluby: data
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
        const {error, isLoaded, kluby } = this.state
        let content;

        if(error) {
            content = <p>Błąd: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>{t('other.loading')}</p>
        } else {
            content = <KlubyListTable kluby={kluby} />
        }

        return (
            <main>
                <h2>{t('kluby.form.list.pageTitle')}</h2>
                <p>{t('kluby.form.list.text')}</p>
                <p>{this.state.notice}</p>
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

export default withTranslation() (KlubyList);