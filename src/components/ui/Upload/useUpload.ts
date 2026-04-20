/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { AuthService, UserService } from "~/services";
import type { UploadFile } from "./Upload";

export interface UseUploadOptions {
  url: string;
  multiple?: boolean;
  maxSize?: number;
  maxCount?: number;
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
  onFileListChange?: (fileList: UploadFile[]) => void;
}

export interface UseUploadReturn {
  fileList: UploadFile[];
  uploadFile: (file: File) => Promise<any>;
  removeFile: (uid: string) => void;
  clearFiles: () => void;
  isUploading: boolean;
  uploadProgress: Record<string, number>;
}

export const useUpload = ({
  url,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxCount,
  onUploadSuccess,
  onUploadError,
  onFileListChange,
}: UseUploadOptions): UseUploadReturn => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  // Create the upload mutation hook at the top level
  const uploadMutation = UserService.useUploadFile({
    url,
    onUploadProgress: progressEvent => {
      // Progress is handled in the uploadFile function
      if (progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(prev => ({ ...prev, [generateUid()]: percent }));
      }
    },
  });

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

  const updateFileList = useCallback(
    (updater: (prev: UploadFile[]) => UploadFile[]) => {
      setFileList(prev => {
        const newList = updater(prev);
        onFileListChange?.(newList);
        return newList;
      });
    },
    [onFileListChange]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      // Check file size
      if (maxSize && file.size > maxSize) {
        throw new Error(
          `File ${file.name} is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
        );
      }
      // Check max count
      if (maxCount) {
        const validCount = fileList.filter(f => f.status !== "error").length;
        if (validCount >= maxCount) {
          if (maxCount === 1) {
            updateFileList(() => []);
          } else {
            throw new Error(`Maximum ${maxCount} files allowed`);
          }
        }
      }

      const uploadFileObj = createUploadFile(file);

      // Add file to list
      updateFileList(prev => [...prev, uploadFileObj]);

      try {
        setIsUploading(true);
        const response = await uploadMutation.mutateAsync({ file });

        // Update file status to done
        updateFileList(prev =>
          prev.map(f =>
            f.uid === uploadFileObj.uid
              ? { ...f, status: "done", response, url: (response as any)?.url }
              : f
          )
        );

        onUploadSuccess?.(response);
        return response;
      } catch (error) {
        // Update file status to error
        updateFileList(prev =>
          prev.map(f =>
            f.uid === uploadFileObj.uid ? { ...f, status: "error", error } : f
          )
        );
        onUploadError?.(error);
        throw error;
      } finally {
        setIsUploading(false);
        // Clean up progress
        setUploadProgress(prev => {
          const { [uploadFileObj.uid]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [
      url,
      maxSize,
      maxCount,
      fileList.length,
      updateFileList,
      onUploadSuccess,
      onUploadError,
    ]
  );

  const removeFile = useCallback(
    (uid: string) => {
      updateFileList(prev => prev.filter(f => f.uid !== uid));

      // Clean up progress
      setUploadProgress(prev => {
        const { [uid]: _, ...rest } = prev;
        return rest;
      });
    },
    [updateFileList]
  );

  const clearFiles = useCallback(() => {
    updateFileList(() => []);
    setUploadProgress({});
  }, [updateFileList]);

  return {
    fileList,
    uploadFile,
    removeFile,
    clearFiles,
    isUploading,
    uploadProgress,
  };
};
