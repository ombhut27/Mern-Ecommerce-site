import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { to: "/add", label: "Add Items", icon: assets.add_icon },
    { to: "/list", label: "List Items", icon: assets.order_icon },
    { to: "/orders", label: "Orders", icon: assets.order_icon },
    { to: "/blog", label: "Add Blogs", icon: assets.add_icon },
    { to: "/bloglist", label: "List Blogs", icon: assets.order_icon },
    { to: "/coupon", label: "Create Coupon", icon: assets.add_icon },
    { to: "/list/coupon", label: "List Coupon", icon: assets.order_icon },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-[6%]" : "w-[18%]"
      } min-h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300`}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end pr-8 pt-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col pt-6 space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              className={`w-5 h-5 transition-transform ${
                isCollapsed ? "mx-auto" : ""
              }`}
              src={item.icon}
              alt={`${item.label} Icon`}
            />
            {!isCollapsed && <span className="hidden md:block">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


