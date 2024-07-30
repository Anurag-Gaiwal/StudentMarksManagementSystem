import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="bg-blue-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-white text-xl font-bold">
          Student Marks Management App
        </h1>
      </div>

      <div className="flex-grow"></div>

      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/create" className="text-white hover:text-gray-300">
          Create
        </Link>
      </div>
    </div>
  );
}
