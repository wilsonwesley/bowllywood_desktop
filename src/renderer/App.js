import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import HomeScreen from "./Home/HomeScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import FranchiseRequestsList from "./franchiseRequestsList";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";
import StocksExtractScreen from "./stocksExtract/StocksExtractScreen";
import Template from "./../components/Template";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Template />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/restaurants" element={<RestaurantsListScreen />} />
            <Route path="/stocks" element={<StocksListScreen />} />
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
