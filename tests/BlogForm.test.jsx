import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../src/components/BlogForm";

// Mock blogService.create to resolve immediately
vi.mock("../src/services/blogs", () => ({
  __esModule: true,
  default: {
    create: vi.fn().mockResolvedValue({
      title: "New Blog",
      author: "New Author",
      url: "http://newblog.com",
    }),
  },
}));

test("calls onSubmit with correct details when a new blog is created", async () => {
  const setBlogs = vi.fn();
  const setErrorMessage = vi.fn();
  const toggleVisibility = vi.fn();

  render(
    <BlogForm
      setBlogs={setBlogs}
      blogs={[]}
      setErrorMessage={setErrorMessage}
      toggleVisibility={toggleVisibility}
    />
  );

  // Fill in the form fields
  await userEvent.type(screen.getByLabelText(/Title/i), "New Blog");
  await userEvent.type(screen.getByLabelText(/Author/i), "New Author");
  await userEvent.type(screen.getByLabelText(/URL/i), "http://newblog.com");

  // Submit the form
  await userEvent.click(screen.getByText("Save"));

  // setBlogs should be called with the new blog added to the array
  expect(setBlogs).toHaveBeenCalledWith([
    {
      title: "New Blog",
      author: "New Author",
      url: "http://newblog.com",
    },
  ]);
  // toggleVisibility should be called to close the form
  expect(toggleVisibility).toHaveBeenCalled();
});
