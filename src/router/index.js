import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Correio from "../pages/correio"
import CorreioImprimir from "../pages/correioImprimir";
import { Provider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const RouteScreen = () => {
  return (
    <Provider>
      <Router>
        <div>
          <Route exact path="/" component={Correio} />
          <PrivateRoute exact path="/imprimir-declaracao" component={CorreioImprimir} />
        </div>
      </Router>
    </Provider>
  );
};

export default RouteScreen;
