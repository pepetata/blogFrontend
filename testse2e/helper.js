const sucessfullLoginWith = async (page, username, password) => {
  await page.locator("#login-username").fill(username);
  await page.locator("#login-password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
  await page.getByText("logged-in").waitFor();
};

const failLoginWith = async (page, username, password) => {
  await page.locator("#login-username").fill(username);
  await page.locator("#login-password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
  // await page.getByText("logged-in").waitFor();
};

const createBlog1 = async (page) => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testblog.com",
  };
  await createBlog(page, blog);
};

const createBlog2 = async (page) => {
  const blog = {
    title: "Test Blog 2",
    author: "Test Author 2",
    url: "http://testblog2.com",
  };
  await createBlog(page, blog);
};

const createBlog = async (page, content) => {
  await page.getByRole("button", { name: "New Blog" }).click();
  await page.getByLabel("Title").fill(content.title);
  await page.getByLabel("Author").fill(content.author);
  await page.getByLabel("URL").fill(content.url);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByText(content.title).waitFor();
};

export {
  sucessfullLoginWith,
  failLoginWith,
  createBlog,
  createBlog1,
  createBlog2,
};
