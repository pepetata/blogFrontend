import { test, expect } from "@playwright/test";
import {
  sucessfullLoginWith,
  failLoginWith,
  createBlog1,
  createBlog2,
} from "./helper";

const user = {
  name: "Flavio",
  username: "flavio",
  password: "admin",
};
const anotherUser = {
  name: "John Smith",
  username: "john",
  password: "password",
};

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
      },
    });

    // create a new user, but do not login with it yet
    await request.post("http://localhost:3001/api/users", {
      data: anotherUser,
    });
    await page.goto("http://localhost:5173");
  }, 5000);

  test.describe("starting blog app", () => {
    test("front page can be opened", async ({ page }) => {
      const locator = await page.getByText("Blogs Application");
      await expect(locator).toBeVisible();
      // await expect(page.getByText("Log in to application")).toBeVisible();
    });

    test("user can log in", async ({ page }) => {
      // await page.getByRole("button", { name: "login" }).click();
      // await page.getByRole("textbox").first().fill(username);
      // await page.getByRole("textbox").last().fill(password);log in
      // or
      // const textboxes = await page.getByRole("textbox").all();
      // await textboxes[0].fill(username);
      // await textboxes[1].fill(password);
      // or
      await sucessfullLoginWith(page, user.username, user.password);
      await expect(page.getByText("Flavio logged in")).toBeVisible();
      // await expect(page.getByText("Blogs")).toBeVisible();
      // await expect(page.getByText("New Blog")).toBeVisible();
    });

    test("user can log out", async ({ page }) => {
      await sucessfullLoginWith(page, user.username, user.password);

      //   await page.pause();
      // Listen for the dialog and accept it
      await page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Are you sure you want to logout?");
        await dialog.accept(); // Accept the confirmation
      });

      await page.getByRole("link", { name: "Flavio logged in" }).click();
      await page.getByRole("button", { name: "Logout" }).click();
      await page.pause();
      const locator = await page.getByText("Login");
      await expect(locator).toBeVisible();
      // await expect(page.getByText("Log in to application")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
      await failLoginWith(page, user.username, "wrong password");

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("invalid username");
      // await expect(page.getByText("wrong credentials")).toBeVisible();
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText(user.name)).not.toBeVisible();
    });

    test("error message disappears after timeout", async ({ page }) => {
      await page.screenshot({ path: "debug.png", fullPage: true });
      await failLoginWith(page, user.username, "wrongpass");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toBeVisible();
      await page.waitForTimeout(5100); // Wait a bit longer than your timeout
      await expect(errorDiv).not.toBeVisible();
    });
  });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await sucessfullLoginWith(page, user.username, user.password);
    });

    test("a new blog can be created", async ({ page }) => {
      //   await page.pause();
      await createBlog1(page);

      const blog = await page.getByText("Test Blog");
      await expect(blog).toBeVisible();
    });

    test("an invalid blog cannot be created", async ({ page }) => {
      await page.getByRole("link", { name: "New Blog" }).click();
      await page.getByLabel("Title").fill("Test Blog");
      await page.getByRole("button", { name: "Save" }).click();
      //   await page.pause();

      const blog = await page.getByText("Test Blog");
      await expect(blog).not.toBeVisible();
    });

    test("view blog details", async ({ page }) => {
      // Create a blog first
      await createBlog1(page);

      // click on the blog on the list of blogs
      await page.getByRole("link", { name: "Test Blog" }).click();

      // view the blog details and the like button
      // const viewButton = page.getByRole("button", { name: "View" });
      // await viewButton.click();

      await expect(await page.getByText("Hide")).toBeVisible();
      await expect(await page.getByText("Author:")).toBeVisible();
      await expect(await page.getByText("URL:")).toBeVisible();
      await expect(await page.getByText("Likes: 0")).toBeVisible();
      await expect(await page.getByText("Remove")).toBeVisible();
    });

    test("hide blog details", async ({ page }) => {
      // Create a blog first
      await createBlog1(page);

      // click on the blog on the list of blogs
      await page.getByRole("link", { name: "Test Blog" }).click();

      // view the blog details
      // const viewButton = page.getByRole("button", { name: "View" });
      // await viewButton.click();

      // hide the blog details
      const hideButton = page.getByRole("button", { name: "Hide" });
      await hideButton.click();

      await expect(await page.getByText("Hide")).not.toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      // Create a blog first
      await createBlog1(page);

      // click on the blog on the list of blogs
      await page.getByRole("link", { name: "Test Blog" }).click();

      // click the like button
      await page.getByRole("button", { name: "Like" }).click();

      // Check if the like count is updated
      const likes = await page.getByText("Likes: 1");
      await expect(likes).toBeVisible();
    });

    test("a blog can be deleted by the user who created it", async ({
      page,
    }) => {
      // Create a blog first
      await createBlog1(page);

      // click on the blog on the list of blogs
      await page.getByRole("link", { name: "Test Blog" }).click();

      await page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain(
          "Are you sure you want to remove this blog?"
        );
        await dialog.accept(); // Accept the confirmation
      });

      // Check if the delete button is visible
      const deleteButton = page.getByRole("button", { name: "Remove" });
      await expect(deleteButton).toBeVisible();

      // Delete the blog
      await deleteButton.click();

      // Check if the blog is removed from the list -> there can be no blog
      const deletedBlog = page.getByText("Hide");
      await expect(deletedBlog).not.toBeVisible();
    });

    // test.only("blogs are ordered by likes", async ({ page }) => {
    //   // Create two blogs
    //   await createBlog1(page);
    //   await createBlog2(page);
    //   //   await page.screenshot({ path: "debug.png", fullPage: true });
    //   // View the first blog and like it
    //   await page.getByRole("button", { name: "View" }).first().click();
    //   await page.getByRole("button", { name: "Like" }).first().click();
    //   // View the second blog and like it twice
    //   await page.getByRole("button", { name: "View" }).last().click();
    //   await page.getByRole("button", { name: "Like" }).last().click();
    //   await page.getByRole("button", { name: "Like" }).last().click();
    //   // Check if the blogs are ordered by likes
    //   //   await page.screenshot({ path: "debug2.png", fullPage: true });
    //   const blogs = await page.locator(".blog");
    //   const likes = await blogs.locator(".likes");
    //   const likesArray = await likes.allTextContents();
    //   const likesNumbers = likesArray.map((like) =>
    //     parseInt(like.replace("Likes: ", ""))
    //   );
    //   const sortedLikes = [...likesNumbers].sort((a, b) => b - a);
    //   expect(likesNumbers).toEqual(sortedLikes);
    // });

    test("user stays logged in after reload", async ({ page }) => {
      // await sucessfullLoginWith(page, user.username, user.password);
      await page.reload();
      await expect(page.getByText("Flavio logged in")).toBeVisible();
    });
  });

  test.describe("not the owner", () => {
    // test.beforeEach(async ({ page }) => {
    // });

    test("cannot delete a blog from other user", async ({ page }) => {
      // login with the original user
      await sucessfullLoginWith(page, user.username, user.password);

      //   create a blog first
      // await page.pause();
      await createBlog1(page);
      // await page.pause();

      // logout
      await page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Are you sure you want to logout?");
        await dialog.accept(); // Accept the confirmation
      });
      await page.getByRole("link", { name: "Flavio logged in" }).click();
      await page.getByRole("button", { name: "Logout" }).click();

      // await page.pause();
      const locator = await page.getByText("Login");
      await expect(locator).toBeVisible();
      // await expect(page.getByText("")).toBeVisible();

      // login with the new user
      await sucessfullLoginWith(
        page,
        anotherUser.username,
        anotherUser.password
      );

      const blog = await page.getByText("Test Blog");
      await expect(blog).toBeVisible();

      // click on the blog on the list of blogs
      await page.pause();
      await page.getByText("Test Blog").click();

      // view the blog details and the like button
      const viewButton = await page.getByRole("button", { name: "Hide" });
      //   await page.screenshot({ path: "debug.png", fullPage: true });
      await expect(viewButton).toBeVisible();
      await viewButton.click();

      // Check if the delete button is not visible
      const removeButton = await page.$("text=Remove");
      expect(removeButton).toBeNull();
      await page.pause();
    });
  });
});
