import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { MembersPage } from '../page/MembersPage';
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

test.describe('Member functionality', async () => {
  test('Create member', async ({ page }, testinfo) => {

    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    // Create member
    await membersPage.createMember(fakeValues.name, fakeValues.email, fakeValues.notes);

    // Validate member
    await membersPage.open();
    await page.waitForLoadState('networkidle');
    await expect(membersPage.containsName(fakeValues.name)).toHaveCount(1);
  });

  test('Create with same name', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      name: faker.name.findName(),
      email_1: faker.internet.email(),
      email_2: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    // Create member
    await membersPage.createMember(fakeValues.name, fakeValues.email_1, fakeValues.notes);

    //Validated Creation
    await membersPage.open();
    await expect(membersPage.containsName(fakeValues.name)).toHaveCount(1);

    // Create member
    await membersPage.createMember(fakeValues.name, fakeValues.email_2, fakeValues.notes);

    //Validated Creation
    await membersPage.open();
    await expect(membersPage.containsName(fakeValues.name)).toHaveCount(2);
    await expect(membersPage.containsEmail(fakeValues.email_1)).toHaveCount(1);
    await expect(membersPage.containsEmail(fakeValues.email_2)).toHaveCount(1);
  });

  test('Create member invalid email', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    // Create member
    await membersPage.createMember(fakeValues.name, fakeValues.email.replace(/@.*$/, ''), fakeValues.notes);

    //Validated that the member was not created by checking for the retry buttton
    await expect(membersPage.retry).toHaveCount(1);
    await expect(membersPage.invalidEmail).toHaveCount(1);
  });

  test('Create without name', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);

    const fakeValues = {
      email: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Create member
    await membersPage.createMember("", fakeValues.email, fakeValues.notes);

    // In the list view when there's no name, the email is set as the name
    // therefore we check for name
    await expect(membersPage.containsName(fakeValues.email)).toHaveCount(1);
  });


  test('Create duplicate email', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      namex: faker.name.findName(),
      namey: faker.name.findName(),
      emailx: faker.internet.email(),
      emaily: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    // Create member X
    await membersPage.createMember(fakeValues.namex, fakeValues.emailx, fakeValues.notes);
    //Validated Creation X
    await expect(membersPage.containsName(fakeValues.namex)).toHaveCount(1);
    await expect(membersPage.containsEmail(fakeValues.emailx)).toHaveCount(1);

    // Create member Y
    await membersPage.createMember(fakeValues.namey, fakeValues.emaily, fakeValues.notes);
    //Validated Creation Y
    await expect(membersPage.containsName(fakeValues.namey)).toHaveCount(1);
    await expect(membersPage.containsEmail(fakeValues.emaily)).toHaveCount(1);

    //Edit member Y put email X, edit member returns false if it failed saving
    expect(await membersPage.editMember({ currEmail: fakeValues.emaily }, { email: fakeValues.emailx })).toBeFalsy()
  });

  test('Create retry', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();
    // Create member with invalid email
    await membersPage.createMember(fakeValues.name, fakeValues.email.replace(/@.*$/, ''), fakeValues.notes, false);
    //Validate the creation failed
    expect(await membersPage.creationStatus()).toBeFalsy();
    // Try again with a valid email
    await membersPage.retryMember({ email: fakeValues.email });
    //Validate the creation succeeded
    expect(await membersPage.creationStatus()).toBeTruthy();
  });

  test('Delete member', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    // Create member X
    await membersPage.createMember(fakeValues.name, fakeValues.email, fakeValues.notes, false);
    // Check it was created
    expect(membersPage.creationStatus).toBeTruthy();
    await membersPage.deleteCurrentMember();
    // Now that we are on the list after deletion check it's not there
    await expect(membersPage.containsEmail(fakeValues.email)).toHaveCount(0);
  });

  test('Filter member', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      namea: faker.name.findName(),
      nameb: 'ZZZ' + faker.name.findName(),  // Distinctive name won't show up by chance
      emailx: faker.internet.email(),
      emaily: faker.internet.email(),
      notes: faker.lorem.sentence(),
      filter: faker.random.alpha(7),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();

    let only_name = fakeValues.namea
    // Create member A with email x and special name to match the filter
    await membersPage.createMember(fakeValues.namea, fakeValues.emailx, fakeValues.notes);
    // Create member B
    await membersPage.createMember(fakeValues.nameb, fakeValues.emaily, fakeValues.notes);

    //Validate by searching for the first member name
    await membersPage.filterMembers(fakeValues.namea);
    await expect(membersPage.containsName(only_name)).toHaveCount(1);
    await expect(membersPage.containsName(fakeValues.nameb)).toHaveCount(0);
  });

  test('Filter delete', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      namea: faker.name.findName(),
      nameb: faker.name.findName(),
      emailx: faker.internet.email(),
      emaily: faker.internet.email(),
      notes: faker.lorem.sentence(),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();
    await membersPage.createMember('Im going to be deleted', fakeValues.emailx, fakeValues.notes);
    await membersPage.createMember('Im going to be deleted', fakeValues.emaily, fakeValues.notes);

    // Search for both members
    await membersPage.filterMembers('Im going to be deleted');
    await membersPage.deleteMemberMultiple();

    await expect(membersPage.containsEmail(fakeValues.emailx)).toHaveCount(0);
    await expect(membersPage.containsEmail(fakeValues.emaily)).toHaveCount(0);
  });

  test('Filter remove label', async ({ page }, testinfo) => {
    // Intances and fakerValues
    const loginPage = new LoginPage(page, testinfo);
    const membersPage = new MembersPage(page, testinfo);
    const fakeValues = {
      namea: faker.name.findName(),
      emaila: faker.internet.email(),
      emailb: faker.internet.email(),
      notes: faker.lorem.sentence(),
      label: faker.lorem.word(7),
    }
    // Login
    await loginPage.open();
    await loginPage.login();
    expect(await loginPage.userIsLoggedIn()).toBeTruthy();

    // Go to members page
    await membersPage.open();
    await membersPage.createMember(fakeValues.namea, fakeValues.emaila, fakeValues.notes, true, fakeValues.label);
    await membersPage.createMember(fakeValues.namea, fakeValues.emailb, fakeValues.notes, true, fakeValues.label);

    // Filter members and remove the label
    await membersPage.filterMembers(fakeValues.namea);
    await membersPage.removeLabelMultiple(fakeValues.label);

    // Check that the members don't have the label
    await membersPage.openMember({ email: fakeValues.emaila });
    await expect(membersPage.containsLabel(fakeValues.label)).toHaveCount(0);
    await membersPage.openMember({ email: fakeValues.emailb });
    await expect(membersPage.containsLabel(fakeValues.label)).toHaveCount(0);
  });
})
