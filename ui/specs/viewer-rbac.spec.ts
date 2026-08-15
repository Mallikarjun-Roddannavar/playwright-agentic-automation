import { FoldersService } from "@api/services/FoldersService";
import { HomePage } from "@pages/HomePage";
import { folderName } from "@utils/common/CommonUtils";
import { test, expect } from "@utils/fixtures/TestFixtures";

test("viewer sees read-only folder and file controls", async ({
  viewerPage,
  adminRequest,
  cleanup,
}) => {
  const adminFolders = new FoldersService(adminRequest);
  const createResponse = await adminFolders.create(folderName("ui-viewer-rbac"));
  expect(createResponse.ok()).toBeTruthy();
  const folder = (await createResponse.json()) as { id: string; name: string };

  cleanup.add(async () => {
    const response = await adminFolders.remove(folder.id);
    expect(response.ok()).toBeTruthy();
  });

  const homePage = new HomePage(viewerPage);
  await homePage.goto();
  const foldersPage = await homePage.openFolders();
  await expect(foldersPage.folderName(folder.name)).toBeVisible();
  await expect(foldersPage.newFolderButton).toBeHidden();
  await expect(foldersPage.bulkDeleteButton).toBeHidden();

  const folderFilesPage = await foldersPage.openFolder(folder.id);
  await expect(folderFilesPage.uploadActionButton).toBeHidden();
  await expect(folderFilesPage.bulkDeleteButton).toBeHidden();
  await expect(folderFilesPage.downloadAllButton).toBeVisible();
  await expect(folderFilesPage.downloadAllButton).toBeDisabled();
});
