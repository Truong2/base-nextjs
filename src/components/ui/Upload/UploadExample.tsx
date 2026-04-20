import React from "react";
import { useUpload } from "./useUpload";
import Button from "../Button";
import { Upload as UploadIcon, Trash2 } from "lucide-react";

export const UploadExample: React.FC = () => {
  const { fileList, uploadFile, removeFile, clearFiles, isUploading } =
    useUpload({
      url: "/upload",
      multiple: true,
      maxSize: 10 * 1024 * 1024, // 10MB
      maxCount: 5,
      onUploadSuccess: response => {
        console.log("Upload successful:", response);
      },
      onUploadError: error => {
        console.error("Upload failed:", error);
      },
    });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }

    // Reset input
    event.target.value = "";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          File Upload Example
        </h2>
        <p className="text-gray-600">
          Upload files with progress tracking and validation
        </p>
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <input
          type="file"
          multiple
          accept="*/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="inline-flex cursor-pointer flex-col items-center space-y-2"
        >
          <UploadIcon className="h-12 w-12 text-gray-400" />
          <div className="text-lg font-medium text-gray-900">
            Click to upload or drag and drop
          </div>
          <div className="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</div>
        </label>
      </div>

      {/* File List */}
      {fileList.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Uploaded Files ({fileList.length})
            </h3>
            <Button
              variant="outline"
              size="small"
              onClick={clearFiles}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </Button>
          </div>

          <div className="grid gap-4">
            {fileList.map(file => (
              <div
                key={file.uid}
                className="flex items-center justify-between rounded-lg border bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
                        <span className="text-xs text-blue-600">IMG</span>
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                        <span className="text-xs text-gray-600">FILE</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Status */}
                  <div className="text-sm">
                    {file.status === "uploading" && (
                      <span className="text-blue-600">Uploading...</span>
                    )}
                    {file.status === "done" && (
                      <span className="text-green-600">Done</span>
                    )}
                    {file.status === "error" && (
                      <span className="text-red-600">Error</span>
                    )}
                  </div>

                  {/* Progress */}
                  {file.status === "uploading" &&
                    file.percent !== undefined && (
                      <div className="w-20">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${file.percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => removeFile(file.uid)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className="text-center text-blue-600">
          <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
          Uploading files...
        </div>
      )}
    </div>
  );
};

export default UploadExample;
