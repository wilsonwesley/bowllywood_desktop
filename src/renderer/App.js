import "./App.scss";
import HomeScreen from "./Home/HomeScreen";
import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import LoginScreen from "./login/LoginScreen"

function App() {
  return (
    <div>
      {/* <HomeScreen /> */}
      {/* <AddFranchiseRequestScreen /> */}
      {/* <RestaurantsListScreen /> */}
      {/* <StocksListScreen /> */}
      <KitchenCalendar />
      {/* <LoginScreen /> */}
    </div>
  );
}

export default App;
