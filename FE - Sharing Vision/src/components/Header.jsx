import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

function Header() {
  const location = useLocation();
  const queryParams = new URLSearchParams(
    location.search
  );
  const status = queryParams.get("status");

  return (
    <header>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Sharing Vision
        </Link>

        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <h5 className="text-sm font-semibold">
              Status:
            </h5>
            <Link
              to={{
                pathname: location.pathname,
                search: "?status=Publish",
              }}
              className={`text-sm font-normal ${
                status === "Publish"
                  ? "text-green-500"
                  : ""
              }`}
            >
              Published
            </Link>
            <Link
              to={{
                pathname: location.pathname,
                search: "?status=Draft",
              }}
              className={`text-sm font-normal ${
                status === "Draft"
                  ? "text-green-500"
                  : ""
              }`}
            >
              Drafted
            </Link>
            <Link
              to={{
                pathname: location.pathname,
                search: "?status=Trash",
              }}
              className={`text-sm font-normal ${
                status === "Trash"
                  ? "text-green-500"
                  : ""
              }`}
            >
              Trashed
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
