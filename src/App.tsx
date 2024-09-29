import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FormLogin from "./pages/FormLogin";
import ListOfTrips from "./components/ListOfTrips";
import PageNotFound from "./pages/PageNotFound";
import TripDetails from "./components/TripDetails";
import LayoutPage from "./components/LayoutPage";
import ErrorAuth from "./pages/ErrorAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage />}>
          <Route
            path="/"
            element={<ListOfTrips />}
            errorElement={<PageNotFound />}
          />
          <Route
            path="/tripsdetails/:order_id"
            element={<TripDetails />}
            errorElement={<PageNotFound />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/errorauth" element={<ErrorAuth />} />
      </Routes>
    </div>
  );
}

export default App;
