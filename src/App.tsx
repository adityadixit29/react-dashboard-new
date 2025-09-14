//importing browser router
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
// importing components and pages
import Home from "./pages/home/Home"
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import Posts from "./pages/posts/Posts";
import Elements from "./pages/elements/Elements";
import Notes from "./pages/notes/Notes";
import Forms from "./pages/forms/Forms";
import Calendar from "./pages/calendar/Calendar";
import Settings from "./pages/settings/Settings";
import Backups from "./pages/backups/Backups";
import Charts from "./pages/charts/Charts";
import Logs from "./pages/logs/Logs";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import { LoadingProvider } from "./contexts/LoadingContext";

//importing global css
import "./styles/global.scss"
import Profile from "./pages/profile/Profile";

function App() {
// layout for the home page 
  const Layout = () => {
    return (
      <LoadingProvider>
        <div className="main">
          {/* navbar  */}
          <Navbar />
          <div className="container">
            <div className="menuContainer">
              {/* menu  */}
              <Menu />
            </div>
            <div className="contentContainer">
              {/* outlet so that we can switch between pages without changing navbar and menu  */}
              <Outlet />
            </div>
          </div>
          {/* footer  */}
          <Footer />
        </div>
      </LoadingProvider>
    )
  }


// routing for the different pages 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      //children router
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "users",
          element: <Users />
        },
        {
          path: "products",
          element: <Products />
        },
        {
          path: "orders",
          element: <Orders />
        },
        {
          path: "posts",
          element: <Posts />
        },
        {
          path: "elements",
          element: <Elements />
        },
        {
          path: "notes",
          element: <Notes />
        },
        {
          path: "forms",
          element: <Forms />
        },
        {
          path: "calendar",
          element: <Calendar />
        },
        {
          path: "settings",
          element: <Settings />
        },
        {
          path: "backups",
          element: <Backups />
        },
        {
          path: "charts",
          element: <Charts />
        },
        {
          path: "logs",
          element: <Logs />
        },
      ]
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);

// rendering router 
  return (
    <RouterProvider router={router} />
  )
}

export default App
