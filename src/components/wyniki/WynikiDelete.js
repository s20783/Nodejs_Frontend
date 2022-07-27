import React from "react";
import {useParams} from "react-router-dom";
import {Navigate} from "react-router";
import {deleteMecz} from "../../api/wynikiApiCalls";

class WynikiDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ID_mecz: this.props.params.meczID,
        }
    }
    componentDidMount() {
        deleteMecz(this.state.ID_mecz)
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
                        pathname: "/wyniki",
                        state: {
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

export default withRouter(WynikiDelete);