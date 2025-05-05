import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Components/ErrorPage";

import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Map from "../Pages/BookASpot/Map/Map";
import Home from "../Pages/Home/Home";
import AddSpots from "../Pages/AddSpots/AddSpots";
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import SpotDetails from "../Pages/SpotDetails/SpotDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/users/:email",
        loader: ({ params }) =>
          fetch(`http://localhost:9000/users/${params.email}`),
        element: <Profile></Profile>,
      },
      {
        path: "/book-a-spot",
        element: (
          <PrivateRoute>
            <Map></Map>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-spot",
        element: <AddSpots></AddSpots>,
      },
      {
        path: "/users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/spot-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:9000/parking/${params.id}`),
        element: <SpotDetails></SpotDetails>,
      },
    ],
  },
]);

export default router;
