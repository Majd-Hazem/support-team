import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">لوحة التحكم</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin-dashboard/services" className="menu-header">
            متابعة الخدمات ونشرها
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/reactivate" className="menu-header">
            إعادة تفعيل حساب مقدمي الخدمات
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/email" className="menu-header">
            تغيير الإيميل لمقدمي الخدمة
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/complaints" className="menu-header">
            متابعة الشكاوى
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
