import "./App.css";
import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";

function App() {
  return (
    <div>
      {/*<AddFranchiseRequestScreen /> */}
      {/* <RestaurantsListScreen /> */}
      {/* <StocksListScreen /> */}
      {/* <StocksDetailScreen /> */}
      <StocksSupplyScreen />
    </div>
  );
}

export default App;
