import Dashboard from '../src/Components/Dashboard'
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";



  const routes = [
    {
      name: "Home",
      link: "/",
      component: 0,
    },
    {
      name: "Offered",
      link: "/Offered",
      activeIndex: 1,
    },
    {
      name: "About",
      link: "/About",
      activeIndex: 2,
    },
    {
      name: "Contact",
      link: "/Contact",
      activeIndex: 3,
    },
  ];