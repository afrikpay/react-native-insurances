import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const uploadFile = async (
  url: string,
  uri: string,
  parameters?: Record<string, string>,
  headers?: Record<string, string>,
  fieldName?: string,
  mimeType?: string,
  callback?: any
) => {
  return FileSystem.createUploadTask(
    url,
    uri,
    {
      headers,
      sessionType:
        Platform.OS === "ios"
          ? FileSystem.FileSystemSessionType.BACKGROUND
          : undefined,
      fieldName,
      mimeType,
      parameters,
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    },
    callback
  );
}; 