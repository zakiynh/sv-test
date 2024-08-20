import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "./Pagination";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  deleteArticle,
  updateArticle,
} from "../stores/actions/articleActions";
import Modal from "react-modal";

const PostTable = ({
  articles = [],
  totalArticles,
  limit,
  offset,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] =
    useState(1);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.articles.loading
  );
  const error = useSelector(
    (state) => state.articles.error
  );

  const [modalIsOpen, setModalIsOpen] =
    useState(false);
  const [currentArticle, setCurrentArticle] =
    useState(null);
  const [updatedTitle, setUpdatedTitle] =
    useState("");
  const [updatedContent, setUpdatedContent] =
    useState("");
  const [updatedCategory, setUpdatedCategory] =
    useState("");
  const [updatedStatus, setUpdatedStatus] =
    useState("");
  const [selectedArticle, setSelectedArticle] =
    useState(null);

  const currentOffset = (currentPage - 1) * limit;

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const queryParams = new URLSearchParams(
        window.location.search
      );
      const status = queryParams.get("status");

      if (status === "Publish")
        return article.Status === "Publish";
      if (status === "Draft")
        return article.Status === "Draft";
      if (status === "Trash")
        return article.Status === "Trash";
      return true;
    });
  }, [articles]);

  const indexOfLastArticle = Math.min(
    currentOffset + limit,
    filteredArticles.length
  );
  const currentArticles = filteredArticles.slice(
    currentOffset,
    indexOfLastArticle
  );

  const paginate = useCallback(
    (pageNumber) => {
      setCurrentPage(pageNumber);
      onPageChange((pageNumber - 1) * limit);
    },
    [limit, onPageChange]
  );

  useEffect(() => {
    setCurrentPage(
      Math.ceil((offset + limit) / limit)
    );
  }, [offset, limit]);

  const handleDelete = (id) => {
    dispatch(deleteArticle(id));
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setModalIsOpen(true);
  };

  const handleUpdate = () => {
    if (selectedArticle) {
      dispatch(
        updateArticle(selectedArticle.id, {
          Title: updatedTitle,
          Content: updatedContent,
          Category: updatedCategory,
          Status: updatedStatus,
        })
      );
      setModalIsOpen(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md flex flex-col justify-between m-2"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.Title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.Content}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {article.Category}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    handleEdit(article)
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() =>
                    handleDelete(article.id)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <i
                    className="fas fa-trash-alt"
                    style={{
                      background: "none",
                      border: "none",
                    }}
                  ></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700">
            No articles available
          </div>
        )}
      </div>
      {selectedArticle && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() =>
            setModalIsOpen(false)
          }
          contentLabel="Edit Article"
          className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto mt-10"
        >
          <h2 className="text-2xl mb-4">
            Edit Article
          </h2>
          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <label className="block">
              <span className="text-gray-700">
                Title:
              </span>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) =>
                  setUpdatedTitle(e.target.value)
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Content:
              </span>
              <textarea
                value={updatedContent}
                onChange={(e) =>
                  setUpdatedContent(
                    e.target.value
                  )
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Category:
              </span>
              <input
                type="text"
                value={updatedCategory}
                onChange={(e) =>
                  setUpdatedCategory(
                    e.target.value
                  )
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Status:
              </span>
              <select
                value={updatedStatus}
                onChange={(e) =>
                  setUpdatedStatus(e.target.value)
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              >
                <option value="Publish">
                  Publish
                </option>
                <option value="Draft">
                  Draft
                </option>
                <option value="Trash">
                  Trash
                </option>
              </select>
            </label>
            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() =>
                  setModalIsOpen(false)
                }
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Pagination
        articlesPerPage={limit}
        totalArticles={totalArticles}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostTable;
