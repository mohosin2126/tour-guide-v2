import { Link } from "react-router-dom";

const Breadcrumbs = ({ items, className }) => {
  return (
    <nav className={`${className} flex items-center space-x-2 font-medium`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && <span className="mx-1 text-gray-400">/</span>}
          {item.path ? (
            <Link
              to={item.path}
              className="text-black hover:text-amber-500 [transition:0.5s] text-xl font-medium  dark:text-blue-400"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400 text-xl font-bold dark:text-white">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
