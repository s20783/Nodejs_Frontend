import React from "react";
import {useParams} from "react-router-dom";
import {Navigate} from "react-router";
import {deleteZawodnik} from "../../api/zawodnicyApiCalls";

class ZawodnicyDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ID_zawodnik: this.props.params.zawodnikID,
        }
    }
    componentDidMount() {
        deleteZawodnik(this.state.ID_zawodnik)
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
                        pathname: "/zawodnicy",
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

export default withRouter(ZawodnicyDelete);