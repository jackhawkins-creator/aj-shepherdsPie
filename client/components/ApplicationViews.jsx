import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./HomePage";
import CreateOrder from "./CreateOrder";
import CreatePizza from "./CreatePizza";
import EditOrder from "./EditOrder";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <HomePage loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="order/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateOrder loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="pizza/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreatePizza />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route
        path="order/edit/:orderId"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <EditOrder loggedInUser={loggedInUser} />
          </AuthorizedRoute>
        }
      />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
