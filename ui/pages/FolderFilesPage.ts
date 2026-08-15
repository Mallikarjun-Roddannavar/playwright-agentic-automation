import { type Locator } from "@playwright/test";

import { BasePage } from "@pages/BasePage";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class FolderFilesPage extends BasePage {
  readonly title: Locator = this.page.getByTestId("files-title");
  readonly uploadActionButton: Locator = this.page.getByTestId("files-upload-action-btn");
  readonly downloadAllButton: Locator = this.page.getByTestId("files-download-all-btn");
  readonly bulkDeleteButton: Locator = this.page.getByTestId("files-bulk-delete-btn");
  readonly uploadFileInput: Locator = this.page.getByTestId("upload-file-input");
  readonly uploadFileButton: Locator = this.page.getByTestId("upload-file-btn");
  readonly uploadSuccessToast: Locator = this.page
    .locator('[role="status"], [role="alert"], [data-testid*="toast"]')
    .filter({ hasText: /upload|success/i })
    .first();

  async waitForPageLoad(): Promise<void> {
    this.logger.info("Waiting for page ready state", {
      name: "files-title",
      timeout: FolderFilesPage.waits.MEDIUM,
    });
    await this.title.waitFor({ timeout: FolderFilesPage.waits.MEDIUM });
    this.logger.info("Page ready", { name: "files-title" });
  }

  uploadedFileName(name: string): Locator {
    return this.page.getByRole("cell", {
      name: new RegExp(escapeRegExp(name), "i"),
    });
  }

  async uploadFile(filePath: string): Promise<this> {
    await this.uploadActionButton.click();
    await this.uploadFileInput.setInputFiles(filePath);
    await this.uploadFileButton.click();
    return this;
  }
}
