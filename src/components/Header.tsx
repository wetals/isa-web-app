import { Link } from "react-router-dom";

const routes = [
  {
    href: "/",
    label: "Portfolio Summary",
  },
  {
    href: "/apply",
    label: "Apply for ISA",
  },
  {
    href: "/",
    label: "Logout",
  },
];

const Header = () => {
  return (
    <header className="bg-pink-600 px-4 py-8 mb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full flex justify-between">
          <Link to="/">
            <div className="items-center lg:flex">
              <p className="font-semibold text-white text-2xl">Cushon</p>
            </div>
          </Link>
          <nav className="lg:flex items-center gap-x-8 overflow-x-auto">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className="text-white font-normal hover:text-gray-900"
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
