import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home";
import Registration from "./Registration/index";
import DonorList from "./pages/donor_list1";
import FilterDonor from "./pages/report/filter_donor";
import FilterSupport from "./pages/report/filter_support";
import FilterSpecialRemarks from "./pages/report/filter_sr";

function App() {
  return (
    <Router basename={'/'}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />     
        <Route path="/Registration" component={Registration} />
        <Route path="/DonorList" component={DonorList} />
        <Route path="/FilterDonor" component={FilterDonor} />
        <Route path="/FilterSupport" component={FilterSupport} />
        <Route path="/FilterSpecialRemarks" component={FilterSpecialRemarks} />
      </Switch>
    </Router>
  );
}
export default App;
