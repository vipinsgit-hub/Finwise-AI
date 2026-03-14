const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { title: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'FinHealth', icon: HeartPulse, path: '/dashboard/finhealth' },
    { title: 'FIRE Calc', icon: Flame, path: '/dashboard/fire' },
    { title: 'Profile', icon: User, path: '/dashboard/profile' },
  ];

  const adminItems = [
    { title: 'Admin Home', icon: TrendingUp, path: '/dashboard/admin' },
    { title: 'Manage Blogs', icon: FileText, path: '/dashboard/admin/blogs' },
    { title: 'Inquiries', icon: Mail, path: '/dashboard/admin/messages' },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-8 flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-lg">
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-text">FinWise AI</span>
      </div>

      <nav className="flex-grow px-4 mt-8 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">User Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-soft font-medium",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-500 hover:bg-gray-50 hover:text-text"
            )}
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <div className="pt-8">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Admin Menu</p>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-soft font-medium",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-text"
                )}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-soft font-medium",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-500 hover:bg-gray-50 hover:text-text"
            )}
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-soft font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
