import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
  Navigate,
} from "react-router-dom";

import FormLogin from "./components/FormLogin";
import ListOfTrips from "./components/ListOfTrips";
import PageNotFound from "./components/PageNotFound";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<ListOfTrips />} />
        <Route path="/login" element={<FormLogin />} />
      </Routes>
    </div>
  );
}

export default App;
