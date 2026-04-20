import React, { useState, useRef, useCallback } from "react";
import {
  Upload as UploadIcon,
  File,
  Image,
  X,
  RotateCcw,
  Eye,
} from "lucide-react";
import { cn } from "~/utils/utils";

export interface UploadFile {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url?: string;
  thumbUrl?: string;
  size: number;
  type: string;
  percent?: number;
  error?: any;
  response?: any;
  originFileObj?: File;
}

export interface UploadProps {
  // Basic props
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  multiple?: boolean;
  accept?: string;
  maxCount?: number;
  maxSize?: number; // in bytes

  // Display props
  listType?: "text" | "picture" | "picture-card";
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
      };

  // Behavior props
  disabled?: boolean;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  customRequest?: (options: any) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  onChange?: (info: any) => void;
  onDrop?: (e: React.DragEvent) => void;

  // UI props
  children?: React.ReactNode;
  itemRender?: (
    originNode: React.ReactElement,
    file: UploadFile,
    fileList: UploadFile[]
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Upload: React.FC<UploadProps> = ({
  fileList = [],
  defaultFileList = [],
  multiple = false,
  accept = "*/*",
  maxCount,
  maxSize = 10 * 1024 * 1024, // 10MB default

  listType = "text",
  showUploadList = true,

  disabled = false,
  beforeUpload,
  customRequest,
  onRemove,
  onChange,
  onDrop,

  children,
  itemRender,
  className,
  style,
}) => {
  const [internalFileList, setInternalFileList] =
    useState<UploadFile[]>(defaultFileList);
  const [dragState, setDragState] = useState<"drag" | "drop" | "leave">(
    "leave"
  );
  const [previewFile, setPreviewFile] = useState<UploadFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFileList = fileList.length > 0 ? fileList : internalFileList;

  const generateUid = () =>
    `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const createUploadFile = (file: File): UploadFile => ({
    uid: generateUid(),
    name: file.name,
    status: "uploading",
    size: file.size,
    type: file.type,
    percent: 0,
    originFileObj: file,
  });

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const validFiles: File[] = [];

      for (const file of fileArray) {
        // Check file size
        if (maxSize && file.size > maxSize) {
          console.error(
            `File ${file.name} is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
          );
          continue;
        }

        // Check max count
        if (
          maxCount &&
          currentFileList.length + validFiles.length >= maxCount
        ) {
          console.error(`Maximum ${maxCount} files allowed`);
          break;
        }

        // Check beforeUpload
        if (beforeUpload) {
          try {
            const shouldUpload = await beforeUpload(file, fileArray);
            if (!shouldUpload) continue;
          } catch (error) {
            console.error("beforeUpload error:", error);
            continue;
          }
        }

        validFiles.push(file);
      }

      if (validFiles.length === 0) return;

      const newUploadFiles = validFiles.map(createUploadFile);
      const updatedFileList = [...currentFileList, ...newUploadFiles];

      setInternalFileList(updatedFileList);
      onChange?.({
        fileList: updatedFileList,
        file: newUploadFiles[0],
      });

      // Handle upload
      if (customRequest) {
        newUploadFiles.forEach(file => {
          customRequest({
            file: file.originFileObj,
            onProgress: (percent: number) => {
              setInternalFileList(prev =>
                prev.map(f =>
                  f.uid === file.uid
                    ? {
                        ...f,
                        percent,
                        status: percent >= 100 ? "done" : "uploading",
                      }
                    : f
                )
              );
            },
            onSuccess: (response: any) => {
              setInternalFileList(prev =>
                prev.map(f =>
                  f.uid === file.uid
                    ? { ...f, status: "done", response, url: response?.url }
                    : f
                )
              );
            },
            onError: (error: any) => {
              setInternalFileList(prev =>
                prev.map(f =>
                  f.uid === file.uid ? { ...f, status: "error", error } : f
                )
              );
            },
          });
        });
      }
    },
    [currentFileList, maxSize, maxCount, beforeUpload, customRequest, onChange]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Reset input value to allow selecting the same file again
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragState("drop");

      const files = e.dataTransfer.files;
      handleFileSelect(files);
      onDrop?.(e);
    },
    [handleFileSelect, onDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragState("drag");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragState("leave");
  }, []);

  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      const shouldRemove = await onRemove(file);
      if (shouldRemove === false) return;
    }

    const updatedFileList = currentFileList.filter(f => f.uid !== file.uid);
    setInternalFileList(updatedFileList);
    onChange?.({
      fileList: updatedFileList,
      file,
    });
  };

  const handlePreview = (file: UploadFile) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  const renderUploadButton = () => {
    if (children) {
      return <div className="flex items-center justify-center">{children}</div>;
    }

    if (listType === "picture-card") {
      return (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <UploadIcon className="mb-2 h-8 w-8" />
          <div className="text-sm">Upload</div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center text-gray-400">
        <UploadIcon className="mr-2 h-5 w-5" />
        <span>Click or drag file to this area to upload</span>
      </div>
    );
  };

  const renderFileIcon = (file: UploadFile) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const renderFileItem = (file: UploadFile) => {
    const isPicture = listType === "picture" || listType === "picture-card";
    const isPictureCard = listType === "picture-card";

    const fileItem = (
      <div
        key={file.uid}
        className={cn(
          "group relative rounded-lg border p-3 transition-all",
          isPictureCard && "h-24 w-24",
          file.status === "error" && "border-red-200 bg-red-50",
          file.status === "done" && "border-green-200 bg-green-50",
          file.status === "uploading" && "border-blue-200 bg-blue-50"
        )}
      >
        {/* File Preview */}
        {isPicture && file.originFileObj && file.type.startsWith("image/") ? (
          <div className="relative h-full w-full">
            <img
              src={URL.createObjectURL(file.originFileObj)}
              alt={file.name}
              className="h-full w-full cursor-pointer rounded object-cover"
              onClick={() => file.status === "done" && handlePreview(file)}
            />
            {file.status === "uploading" && (
              <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50">
                <div className="text-xs text-white">{file.percent}%</div>
              </div>
            )}
            {file.status === "done" && (
              <div
                className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
                onClick={() => handlePreview(file)}
              >
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <Eye className="h-4 w-4 text-gray-700" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {renderFileIcon(file)}
            <span className="truncate text-sm">{file.name}</span>
          </div>
        )}

        {/* File Info */}
        {!isPicture && (
          <div className="mt-2 text-xs text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
        )}

        {/* Progress Bar */}
        {file.status === "uploading" && file.percent !== undefined && (
          <div className="mt-2">
            <div className="h-1 w-full rounded-full bg-gray-200">
              <div
                className="h-1 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${file.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex space-x-1">
            {file.status === "done" && (
              <button
                onClick={() => handlePreview(file)}
                className="rounded bg-blue-100 p-1 text-blue-600 hover:bg-blue-200"
                title="Preview"
              >
                <Eye className="h-3 w-3" />
              </button>
            )}
            {file.status === "error" && (
              <button
                onClick={() => {
                  /* Retry logic */
                }}
                className="rounded bg-red-100 p-1 text-red-600 hover:bg-red-200"
                title="Retry"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={() => handleRemove(file)}
              className="rounded bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
              title="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        {file.status === "error" && (
          <div className="absolute left-1 top-1">
            <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
              Error
            </div>
          </div>
        )}
      </div>
    );

    return itemRender ? itemRender(fileItem, file, currentFileList) : fileItem;
  };

  const renderUploadList = () => {
    if (!showUploadList) return null;

    if (listType === "picture-card") {
      return (
        <div className="grid grid-cols-4 gap-4">
          {currentFileList.map(renderFileItem)}
          {(!maxCount || currentFileList.length < maxCount) && (
            <div
              className={cn(
                "cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400",
                dragState === "drag" && "border-blue-400 bg-blue-50",
                disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => !disabled && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {renderUploadButton()}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {currentFileList.map(renderFileItem)}
        {(!maxCount || currentFileList.length < maxCount) && (
          <div
            className={cn(
              "cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400",
              dragState === "drag" && "border-blue-400 bg-blue-50",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => !disabled && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {renderUploadButton()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)} style={style}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {renderUploadList()}

      {/* Preview Modal */}
      {isPreviewOpen && previewFile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{previewFile.name}</h3>
              <button
                onClick={closePreview}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Preview */}
              {previewFile.type.startsWith("image/") &&
              previewFile.originFileObj ? (
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(previewFile.originFileObj)}
                    alt={previewFile.name}
                    className="max-h-[60vh] max-w-full rounded object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 text-center">
                  <File className="h-16 w-16 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Preview not available for this file type
                    </p>
                    <p className="text-xs text-gray-400">{previewFile.type}</p>
                  </div>
                </div>
              )}

              {/* File Info */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <p className="text-gray-600">{previewFile.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Size:</span>
                    <p className="text-gray-600">
                      {(previewFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <p className="text-gray-600">{previewFile.type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <p className="capitalize text-gray-600">
                      {previewFile.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
