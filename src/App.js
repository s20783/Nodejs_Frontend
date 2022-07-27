import React from 'react';
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import Content from "./components/other/Content";
import Footer from "./components/fragments/Footer";
import {
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";
import KlubyList from "./components/kluby/KlubyList";
import KlubyDetails from "./components/kluby/KlubyDetails";
import ZawodnicyList from "./components/zawodnicy/ZawodnicyList";
import ZawodnicyDetails from "./components/zawodnicy/ZawodnicyDetails";
import KlubyForm from "./components/kluby/KlubyForm";
import KlubyDelete from "./components/kluby/KlubyDelete";
import Klub_zawodnikList from "./components/klub_zawodnik/Klub_zawodnikList";
import SezonyList from "./components/sezony/SezonyList";
import WynikiList from "./components/wyniki/WynikiList";
import ZawodnicyForm from "./components/zawodnicy/ZawodnicyForm";
import SezonyDetails from "./components/sezony/SezonyDetails";
import WynikiDetails from "./components/wyniki/WynikiDetails";
import SezonyForm from "./components/sezony/SezonyForm";
import Klub_zawodnikDetails from "./components/klub_zawodnik/Klub_zawodnikDetails";
import Klub_zawodnikForm from "./components/klub_zawodnik/Klub_zawodnikForm";
import WynikiFormAdd from "./components/wyniki/WynikiFormAdd";
import WynikiFormEdit from "./components/wyniki/WynikiFormEdit";
import {getCurrentUser} from "./helpers/authHelper";
import RequireAuthAdmin from "./components/other/RequireAuthAdmin";
import RequireAuthUser from "./components/other/RequireAuthUser";
import ZawodnicyDelete from "./components/zawodnicy/ZawodnicyDelete";
import Klub_zawodnikDelete from "./components/klub_zawodnik/Klub_zawodnikDelete";
import SezonyDelete from "./components/sezony/SezonyDelete";
import WynikiDelete from "./components/wyniki/WynikiDelete";
import RequireAuthKapitan from "./components/other/RequireAuthKapitan";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({user: user})
    }

    handleLogout = () => {
        localStorage.removeItem("user")
        this.setState({user: undefined})
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user: currentUser})
    }

    render() {
        return (
            <BrowserRouter>
                <div className="content">
                    <Header
                        handleLogout={this.handleLogout}
                        handleLogin={this.handleLogin}
                    />
                    <Navigation nav={this.state.nav} setNavState={this.setNavState}/>
                    <Routes>
                        <Route path="/" element={<Content/>}/>


                        <Route path="/kluby" element={<KlubyList/>}/>
                        <Route exact path="/kluby/details/:klubID" element={<KlubyDetails/>}/>
                        <Route element={<RequireAuthAdmin/>}>
                            <Route path="/kluby/add" element={<KlubyForm/>}/>
                            <Route path="/kluby/delete/:klubID" element={<KlubyDelete/>}/>
                        </Route>
                        <Route element={<RequireAuthKapitan/>}>
                            <Route path="/kluby/edit/:klubID" element={<KlubyForm/>}/>
                        </Route>


                        <Route path="/zawodnicy" element={<ZawodnicyList/>}/>
                        <Route exact path="/zawodnicy/details/:zawodnikID" element={<ZawodnicyDetails/>}/>
                        <Route element={<RequireAuthAdmin/>}>
                            <Route path="/zawodnicy/add" element={<ZawodnicyForm/>}/>
                            <Route path="/zawodnicy/delete/:zawodnikID" element={<ZawodnicyDelete/>}/>
                        </Route>
                        <Route element={<RequireAuthUser/>}>
                            <Route path="/zawodnicy/edit/:zawodnikID" element={<ZawodnicyForm/>}/>
                        </Route>


                        <Route path="/klub_zawodnik" element={<Klub_zawodnikList/>}/>
                        <Route exact path="/klub_zawodnik/details/:klubID/:zawodnikID"
                               element={<Klub_zawodnikDetails/>}/>
                        <Route element={<RequireAuthAdmin/>}>
                            <Route path="/klub_zawodnik/add" element={<Klub_zawodnikForm/>}/>
                            <Route path="/klub_zawodnik/edit/:klub_zawodnikID" element={<Klub_zawodnikForm/>}/>
                            <Route path="/klub_zawodnik/delete/:klub_zawodnikID" element={<Klub_zawodnikDelete/>}/>
                        </Route>


                        <Route path="/sezony" element={<SezonyList/>}/>
                        <Route path="/sezony/details/:sezonID" element={<SezonyDetails/>}/>
                        <Route element={<RequireAuthAdmin/>}>
                            <Route path="/sezony/edit/:sezonID" element={<SezonyForm/>}/>
                            <Route path="/sezony/add" element={<SezonyForm/>}/>
                            <Route path="/sezony/delete/:sezonID" element={<SezonyDelete/>}/>
                        </Route>


                        <Route path="/wyniki" element={<WynikiList/>}/>
                        <Route path="/wyniki/details/:meczID" element={<WynikiDetails/>}/>
                        <Route element={<RequireAuthAdmin/>}>
                            <Route path="/wyniki/add" element={<WynikiFormAdd/>}/>
                            <Route path="/wyniki/edit/:meczID" element={<WynikiFormEdit/>}/>
                            <Route path="/wyniki/delete/:meczID" element={<WynikiDelete/>}/>
                        </Route>
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        )
    }
}


export default App;
