import {useEffect} from "react";
import { Link, NavLink } from "react-router";
import {useAuth} from "../../context/AuthContext.jsx";

function Sidebar() {

  const { userRole } = useAuth();

  let sideBar = [
    {
      "name": "Dashboard",
      "link" : "/dashboard",
      "roles" : ["admin", "user"]
    },
    {
      "name": "Categories",
      "link" : "/dashboard/categories",
      "roles" : ["admin"]
    },
    {
      "name": "Products",
      "link" : "/dashboard/products",
      "roles" : ["admin"]
    },
    {
      "name": "Orders",
      "link" : "/dashboard/orders",
      "roles" : ["admin","user"]
    }
  ]


  sideBar = sideBar.filter(item => {
    console.log(userRole);
    return item.roles.includes(userRole);
  });

  useEffect(() => {

      const handleStorageChange = () => {
          sideBar = sideBar.filter(item => {
            console.log(userRole);
        return item.roles.includes(userRole);
      });
    }

    handleStorageChange();

  },[userRole]);


  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        Shop<span>Ease</span>
      </Link>

      <nav className="sidebar-nav">
        {
          sideBar.map((item, index) => {
            return (
              <NavLink to={item.link} key={index}>
                {item.name}
              </NavLink>
            );
          })
        }
      </nav>
    </aside>
  );
}

export default Sidebar;