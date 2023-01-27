import "./App.scss";
import HomeScreen from "./Home/HomeScreen";
import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";
import StocksExtractScreen from "./stocksExtract/StocksExtractScreen";

function App() {
  return (
    <div>
      {/* <HomeScreen /> */}
      {/* <AddFranchiseRequestScreen /> */}
      {/* <RestaurantsListScreen /> */}
      {/* <StocksListScreen /> */}
      <KitchenCalendar />
      {/* <StocksDetailScreen /> */}
      {/* <StocksSupplyScreen /> */}
      {/* <StocksExtractScreen /> */}
    </div>
  );
}

export default App;
