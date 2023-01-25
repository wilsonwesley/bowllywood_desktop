import "./App.css";
import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import StocksDetailScreen from "./stocksDetail/StocksDetailScreen";

function App() {
  return (
    <div>
      {/*<AddFranchiseRequestScreen /> */}
      {/* <RestaurantsListScreen /> */}
      <StocksListScreen />
      {/* <StocksDetailScreen /> */}
    </div>
  );
}

export default App;
