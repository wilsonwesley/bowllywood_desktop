import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import HomeScreen from "./Home/HomeScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import FranchiseRequestDetailsScreen from "./franchiseRequestDetails/FranchiseRequestDetails";
import FranchiseRequestsList from "./franchiseRequestsList";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
// import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";
import StocksExtractScreen from "./stocksExtract/StocksExtractScreen";
import Template from "./../components/Template";
import ReservationList from "./reservation/ReservationList";
import ReservationDetail from "./reservation/ReservationDetail";
import ReservationForm from "./reservation/ReservationForm";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/" element={<Template />}>
            <Route path="/reservations/form" element={<ReservationForm />} />
            <Route path="/reservations/form/:id" element={<ReservationForm action='EDIT' />} />
            <Route path="/reservations/:id" element={<ReservationDetail />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/restaurants" element={<RestaurantsListScreen />} />
            <Route path="/stocks" element={<StocksListScreen />} />
            <Route
              path="/my-franchise-requests/:id"
              element={<FranchiseRequestDetailsScreen />}
            />
            <Route path="/kitchenCalendar" element={<KitchenCalendar />} />
            <Route path="/stocks/supply/:id" element={<StocksSupplyScreen />} />
            <Route
              path="/stocks/extract/:id"
              element={<StocksExtractScreen />}
            />
            <Route
              path="/franchiseRequestsList"
              element={<FranchiseRequestsList />}
            />
          </Route>
        </Routes>
      </Router>
      {/* <StocksDetailScreen /> */}
    </div>
  );
}

export default App;
