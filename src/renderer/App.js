import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import HomeScreen from "./Home/HomeScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import FranchiseRequestAcceptScreen from "./franchiseRequestAccept/FranchiseRequestAcceptScreen";
import FranchiseRequestDetailsScreen from "./franchiseRequestDetails/FranchiseRequestDetails";
import FranchiseRequestRefuseScreen from "./franchiseRequestsRefuse/FranchiseRequestRefuseScreen";
import FranchiseRequestsList from "./franchiseRequestsList";
import RestaurantAddScreen from "./restaurantAdd/RestaurantAddScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";
import StocksExtractScreen from "./stocksExtract/StocksExtractScreen";
import Template from "./../components/Template";
import ReservationList from "./reservation/ReservationList";
import StockCreateScreen from "./stockCreate/StockCreate";
import SupplierAddScreen from "./supplierAdd/SupplierAddScreen";
import SupplierDeleteScreen from "./supplierDelete/SupplierDeleteScreen";
import SupplierDetailsScreen from "./supplierDetails/SupplierDetailsScreen";
import SupplierEditScreen from "./supplierEdit/SupplierEditScreen";
import SuppliersListScreen from "./supplierList/SupplierListScreen";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Template />}>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/restaurants/add" element={<RestaurantAddScreen />} />
            <Route path="/restaurants" element={<RestaurantsListScreen />} />
            <Route path="/stocks" element={<StocksListScreen />} />
            <Route
              path="/franchise-requests/accepted/:id"
              element={<FranchiseRequestAcceptScreen />}
            />
            <Route
              path="/franchise-requests/refused/:id"
              element={<FranchiseRequestRefuseScreen />}
            />
            <Route
              path="/franchise-requests/:id"
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
            <Route path="/stocks/create" element={<StockCreateScreen />} />
            <Route path="/suppliers/add" element={<SupplierAddScreen />} />
            <Route
              path="/suppliers/delete/:id"
              element={<SupplierDeleteScreen />}
            />
            <Route
              path="/suppliers/edit/:id"
              element={<SupplierEditScreen />}
            />
            <Route path="/suppliers/:id" element={<SupplierDetailsScreen />} />
            <Route path="/supplierList" element={<SuppliersListScreen />} />
          </Route>
        </Routes>
      </Router>

      {/* <StocksDetailScreen /> */}
    </div>
  );
}

export default App;
