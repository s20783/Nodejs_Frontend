import React from "react";
import {useParams} from "react-router-dom";
import {Navigate} from "react-router";
import {deleteKlub_zawodnik} from "../../api/klub_zawodnikApiCalls";

class Klub_zawodnikDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ID_klub: this.props.params.klub_zawodnikID,
        }
    }
    componentDidMount() {
        deleteKlub_zawodnik(this.state.ID_klub)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            redirect: true
                        })
                    }
                }
            )
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            if (redirect) {
                return (
                    <Navigate to={{
                        pathname: "/klub_zawodnik",
                        state: {
                            //notice: notice
                        }
                    }}/>
                )
            }
        } else {
            return null
        }
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

export default withRouter(Klub_zawodnikDelete);