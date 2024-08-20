import React, {
  useEffect,
  useState,
} from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { fetchArticles } from "../stores/actions/articleActions";
import PostTable from "../components/PostTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { submitArticle } from "../stores/actions/articleActions";

Modal.setAppElement("#root");

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: articles, totalArticles } =
    useSelector((state) => state.articles);
  const loading = useSelector(
    (state) => state.articles.loading
  );
  const error = useSelector(
    (state) => state.articles.error
  );

  const limit =
    parseInt(searchParams.get("limit")) || 10;
  const offset =
    parseInt(searchParams.get("offset")) || 0;

  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [articleTitle, setArticleTitle] =
    useState("");
  const [articleContent, setArticleContent] =
    useState("");
  const [articleStatus, setArticleStatus] =
    useState("Publish");
  const [articleCategory, setArticleCategory] =
    useState("");

  useEffect(() => {
    console.log(
      `Fetching articles with limit: ${limit}, offset: ${offset}`
    );
    dispatch(fetchArticles(limit, offset));
  }, [limit, offset, dispatch]);

  useEffect(() => {
    console.log("Articles from state:", articles);
  }, [articles]);

  const handlePageChange = (newOffset) => {
    console.log("New Offset:", newOffset);
    if (newOffset < totalArticles) {
      navigate(
        `?limit=${limit}&offset=${newOffset}`,
        { replace: true }
      );
    }
  };

  const handleCreateArticle = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      Title: articleTitle,
      Content: articleContent,
      Category: articleCategory,
      Status: articleStatus,
    };
    dispatch(submitArticle(articleData));
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleCreateArticle}
        className="m-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faPlus} /> Create
        Article
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() =>
          setIsModalOpen(false)
        }
        contentLabel="Create Article"
        className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto mt-10"
      >
        <h2 className="text-2xl mb-4">
          Create Article
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <label className="block">
            <span className="text-gray-700">
              Title:
            </span>
            <input
              type="text"
              value={articleTitle}
              onChange={(e) =>
                setArticleTitle(e.target.value)
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
              value={articleContent}
              onChange={(e) =>
                setArticleContent(e.target.value)
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
              value={articleCategory}
              onChange={(e) =>
                setArticleCategory(e.target.value)
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
              value={articleStatus}
              onChange={(e) =>
                setArticleStatus(e.target.value)
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="publish">
                Publish
              </option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit"}
            </button>
            <button
              type="button"
              onClick={() =>
                setIsModalOpen(false)
              }
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-2">
              Error: {error}
            </p>
          )}
        </form>
      </Modal>
      {Array.isArray(articles) &&
      articles.length > 0 ? (
        <PostTable
          articles={articles}
          totalArticles={totalArticles}
          limit={limit}
          offset={offset}
          onPageChange={handlePageChange}
        />
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default Dashboard;
