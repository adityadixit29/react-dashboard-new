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
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";

//importing global css
import "./styles/global.scss"

function App() {
// layout for the home page 
  const Layout = () => {
    return (
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
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/products",
          element: <Products />
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
