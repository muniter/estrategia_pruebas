import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { PostsPage } from '../page/PostsPage';
import faker from '@faker-js/faker';
import { VRTBeforeAll } from '../util/util';
import { VISUAL_REGRESSION_TESTING } from '../../shared/SharedConfig';

test.beforeAll(VRTBeforeAll);
if (VISUAL_REGRESSION_TESTING) {
  faker.seed(12345);
  // Run test serially only if visual regression testing is enabled
  test.describe.configure({ mode: 'serial' })
} else {
  // Run tests in parallel if not on VRT
  test.describe.configure({ mode: 'parallel' })
}
// Run this tests in parallel
test.describe('Post functionality', async () => {
  test('Create post', async ({ page }, testinfo) => {

    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const postsPage = new PostsPage(page, testinfo);
    const fakeValues = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create post
    await postsPage.createPost(fakeValues.title, fakeValues.content);
    expect(postsPage.isPublished()).toBeTruthy();

    //ValidatedPost
    await postsPage.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(1);
  });

  test('Create without content', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const postsPage = new PostsPage(page, testinfo);
    const fakeValues = {
      title: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create post
    await postsPage.createPost(fakeValues.title, null);

    //ValidatedPost
    await postsPage.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(1);
  });

  test('Create multiple with the same title', async ({ page }, testinfo) => {

    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const postsPage = new PostsPage(page, testinfo);
    const postsPage2 = new PostsPage(page, testinfo);
    const fakeValues = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create post
    await postsPage.createPost(fakeValues.title, fakeValues.content);
    expect(await postsPage.isPublished()).toBeTruthy();

    //ValidatedPost
    await postsPage.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(1);

    // Create post
    await postsPage2.createPost(fakeValues.title, fakeValues.content);

    //ValidatedPost
    await postsPage2.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(2);
  });

  test('Create and edit it', async ({ page }, testinfo) => {

    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const postsPage = new PostsPage(page, testinfo);
    const fakeValues = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      newTitle: faker.lorem.sentence()
    }

    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create post
    await postsPage.createPost(fakeValues.title, fakeValues.content);
    expect(await postsPage.isPublished()).toBeTruthy();

    //ValidatedPost
    await postsPage.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(1);

    // Edit post
    await postsPage.editPost(fakeValues.title, fakeValues.newTitle);
    // Check if the new member is in the list
    await expect(postsPage.containsTitle(fakeValues.newTitle)).toHaveCount(1, { timeout: 5000 });

  });

  test('Create and delete it', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const postsPage = new PostsPage(page, testinfo);
    const fakeValues = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create post
    await postsPage.createPost(fakeValues.title, fakeValues.content);
    expect(await postsPage.isPublished()).toBeTruthy();

    //ValidatedPost
    await postsPage.open();
    await page.waitForLoadState('networkidle');
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(1);

    // Delete post
    await postsPage.deletePost(fakeValues.title);
    // Check that the new member is not in the list
    await expect(postsPage.containsTitle(fakeValues.title)).toHaveCount(0);
  });
})
