import './App.scss';
import HomeScreen from './Home/HomeScreen';
import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";

function App() {
  return (
    <div>
      {/* <HomeScreen /> */}
      {/* <AddFranchiseRequestScreen /> */}
      {/* <RestaurantsListScreen /> */}
      <StocksListScreen />
    </div>
  );
}

export default App;