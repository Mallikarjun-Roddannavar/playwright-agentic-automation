import type { APIResponse } from "@playwright/test";

import { BaseApiService } from "@api/services/BaseApiService";

export class FilesService extends BaseApiService {
  async list(folderId: string): Promise<APIResponse> {
    this.logger.info("Listing files", { folderId });
    const response = await this.request.get(FilesService.routes.folderFiles(folderId));
    this.logger.info("List files response received", {
      folderId,
      status: response.status(),
      ok: response.ok(),
    });
    return response;
  }

  async upload(
    folderId: string,
    filename: string,
    content: Buffer,
    mimeType = "text/plain"
  ): Promise<APIResponse> {
    this.logger.info("Uploading file", { folderId, filename, size: content.length });
    const response = await this.request.post(FilesService.routes.folderFiles(folderId), {
      multipart: {
        file: {
          name: filename,
          mimeType,
          buffer: content,
        },
      },
    });
    this.logger.info("Upload file response received", {
      folderId,
      filename,
      status: response.status(),
      ok: response.ok(),
    });
    return response;
  }
}
