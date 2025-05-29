import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../src/components/Blog";

// Mock blogService.addLike to resolve immediately
vi.mock("../src/services/blogs", () => ({
  __esModule: true,
  default: {
    addLike: vi.fn().mockResolvedValue({}),
  },
}));

test("renders title but not url, author or likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 5,
    user: "123",
  };

  render(
    <Blog
      blog={blog}
      userId="123"
      setErrorMessage={() => {}}
      updateBlog={() => {}}
      removeBlog={() => {}}
    />
  );

  // Title should be visible
  expect(screen.getByText(/Test Blog/)).toBeInTheDocument();

  // Author, URL, and likes should NOT be visible by default
  expect(screen.queryByText(/Test Author/)).not.toBeInTheDocument();
  expect(screen.queryByText(/http:\/\/test.com/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Likes:/)).not.toBeInTheDocument();
});

test("renders blog url and likes when the view button is clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 5,
    user: "123",
  };

  render(
    <Blog
      blog={blog}
      userId="123"
      setErrorMessage={() => {}}
      updateBlog={() => {}}
      removeBlog={() => {}}
    />
  );

  // Click the "View" button to show details
  const viewButton = screen.getByText("View");
  await userEvent.click(viewButton);

  // Now URL and likes should be visible
  expect(screen.getByText(/http:\/\/test.com/)).toBeInTheDocument();
  expect(screen.getByText(/Likes:/)).toBeInTheDocument();
});

test("calls the like handler twice if like button is clicked twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 5,
    user: "123",
  };

  const mockUpdateBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      userId="123"
      setErrorMessage={() => {}}
      updateBlog={mockUpdateBlog}
      removeBlog={() => {}}
    />
  );

  // Show details first
  const viewButton = screen.getByText("View");
  await userEvent.click(viewButton);

  // Click the like button twice
  const likeButton = screen.getByText("Like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  // The handler should be called twice
  expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
});
