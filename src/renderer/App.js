import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Popup from "react-popup";

// import AddFranchiseRequestScreen from "./addFranchiseRequest/AddFranchiseRequestScreen";
import HomeScreen from "./Home/HomeScreen";
import KitchenCalendar from "./kitchenCalendar/KitchenCalendar";
import FranchiseRequestAcceptScreen from "./franchiseRequestAccept/FranchiseRequestAcceptScreen";
import FranchiseRequestsAcceptedListScreen from "./franchiseRequestAcceptedList/FranchiseRequestAcceptedListScreen";
import FranchiseRequestDetailsScreen from "./franchiseRequestDetails/FranchiseRequestDetails";
import FranchiseRequestRefuseScreen from "./franchiseRequestsRefuse/FranchiseRequestRefuseScreen";
import FranchiseRequestsList from "./franchiseRequestsList";
import RestaurantAddScreen from "./restaurantAdd/RestaurantAddScreen";
import RestaurantArchiveScreen from "./restaurantArchive/RestaurantArchiveScreen";
import RestaurantEditScreen from "./restaurantEdit/RestaurantEditScreen";
import RestaurantsListScreen from "./restaurantsList/RestaurantsList";
import StocksListScreen from "./stocksList/StocksListScreen";
import LoginScreen from "./login/LoginScreen";
import StocksSupplyScreen from "./stocksSupply/StocksSupplyScreen";
import StocksExtractScreen from "./stocksExtract/StocksExtractScreen";
import Template from "./../components/Template";
import ReservationList from "./reservation/ReservationList";
import ReservationDetail from "./reservation/ReservationDetail";
import ReservationForm from "./reservation/ReservationForm";
import StockCreateScreen from "./stockCreate/StockCreateScreen";
import StockDeleteScreen from "./stockDelete/StockDeleteScreen";
import SupplierAddScreen from "./supplierAdd/SupplierAddScreen";
import SupplierDeleteScreen from "./supplierDelete/SupplierDeleteScreen";
import SupplierDetailsScreen from "./supplierDetails/SupplierDetailsScreen";
import SupplierEditScreen from "./supplierEdit/SupplierEditScreen";
import SuppliersListScreen from "./supplierList/SupplierListScreen";
import Maintenance from "./maintenance/Maintenance";
import ErrorScreen from "./errorScreen/ErrorScreen";
import UserListScreen from "./userList/UserListScreen";
import RouteProtector from "../components/RouteProtector";
import BowlAdminList from "./bowl/BowlAdminList";
import BowlDetail from "./bowl/BowlDetail";
import BowlForm from "./bowl/BowlForm";
import RegisterScreen from "./register";

import { AuthProvider } from "../providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/" element={<Template />}>
              <Route
                element={
                  <RouteProtector
                    permittedRoles={[
                      "ROLE_USER",
                      "ROLE_WAITER",
                      "ROLE_MANAGER",
                      "ROLE_CEO",
                    ]}
                  />
                }
              >
                <Route
                  path="/reservations/form"
                  element={<ReservationForm />}
                />
                <Route
                  path="/reservations/form/:id"
                  element={<ReservationForm action="EDIT" />}
                />
                <Route
                  path="/reservations/:id"
                  element={<ReservationDetail />}
                />
              </Route>

              <Route
                path="/reservations"
                element={
                  <RouteProtector
                    permittedRoles={["ROLE_WAITER", "ROLE_MANAGER", "ROLE_CEO"]}
                  >
                    <ReservationList />
                  </RouteProtector>
                }
              />
              <Route
                element={
                  <RouteProtector
                    permittedRoles={[
                      "ROLE_SUPERADMIN",
                      "ROLE_ADMIN",
                      "ROLE_CEO",
                      "ROLE_MANAGER",
                      "ROLE_COOK",
                    ]}
                  />
                }
              >
                <Route path="/menus/admin-list" element={<BowlAdminList />} />
                <Route path="/menus/:id" element={<BowlDetail />} />
              </Route>
              <Route
                element={<RouteProtector permittedRoles={["ROLE_ADMIN"]} />}
              >
                <Route
                  path="/menus/create"
                  element={<BowlForm action="ADD" />}
                />
                <Route
                  path="/menus/edit/:id"
                  element={<BowlForm action="EDIT" />}
                />
              </Route>
              <Route path="/home" element={<HomeScreen />} />
              <Route
                path="/restaurants/delete/:id"
                element={<RestaurantArchiveScreen />}
              />
              <Route
                path="/restaurants/edit/:id"
                element={<RestaurantEditScreen />}
              />
              <Route
                path="/restaurants/add"
                element={<RestaurantAddScreen />}
              />
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
                path="/franchise-requests/accepted"
                element={<FranchiseRequestsAcceptedListScreen />}
              />
              <Route
                path="/franchise-requests/:id"
                element={<FranchiseRequestDetailsScreen />}
              />
              <Route path="/kitchenCalendar" element={<KitchenCalendar />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route
                path="/stocks/supply/:id"
                element={<StocksSupplyScreen />}
              />
              <Route
                path="/stocks/extract/:id"
                element={<StocksExtractScreen />}
              />
              <Route
                path="/franchiseRequestsList"
                element={<FranchiseRequestsList />}
              />
              <Route
                path="/stocks/delete/:id"
                element={<StockDeleteScreen />}
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
              <Route
                path="/suppliers/:id"
                element={<SupplierDetailsScreen />}
              />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/supplierList" element={<SuppliersListScreen />} />
              <Route path="/profile" element={<Maintenance />} />
              <Route path="/erreur" element={<ErrorScreen />} />
              <Route path="/userList" element={<UserListScreen />} />
              <Route path="/reviews" element={<Maintenance />} />
              <Route
                path="*"
                element={
                  <ErrorScreen
                    errCode={404}
                    errText="La page demandée n'existe pas. Veuillez recommencer ou retourner sur la page d'accueil."
                  />
                }
              />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Popup />
      </AuthProvider>
    </>
  );
}

export default App;
