import React from "react";

const Pagination = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <=
    Math.ceil(totalArticles / articlesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-5">
      <ul className="flex list-none p-0 gap-2">
        {pageNumbers.length > 0 ? (
          pageNumbers.map((number) => (
            <li
              key={number}
              className={`border border-gray-300 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  paginate(number);
                }}
                href={`?page=${number}`}
                className="block px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                {number}
              </a>
            </li>
          ))
        ) : (
          <li className="page-item disabled">
            <span className="page-link">
              No pages
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
