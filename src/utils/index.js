export function isValidFileType(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const allowedTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
    const fileType = `.${file.name.split(".").pop()}`;
    if (!allowedTypes.includes(fileType)) {
      return false;
    }
  }
  return true;
}

export function isValidFileSize(targetFiles, maxSize) {
  return targetFiles.filter((targetFile) => targetFile.size < maxSize);
}

export function isExceedMaxTotalSize(targetFiles, maxSize) {
  const totalSize = targetFiles.reduce(
    (acc, targetFile) => acc + targetFile.size,
    0
  );
  return totalSize > maxSize;
}

export function getFileType(fileName) {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex !== -1) {
    // Extract the file type (extension) using substring
    const fileType = fileName.substring(dotIndex + 1).toLowerCase();
    return fileType;
  } else {
    // If there is no dot in the file name, consider it as an unknown file type
    return "unknown";
  }
}

export function formatFileSize(fileSizeInBytes) {
  // Convert to kilobytes (KB)
  const fileSizeInKB = fileSizeInBytes / 1024;

  // Convert to megabytes (MB)
  const fileSizeInMB = fileSizeInKB / 1024;

  if (fileSizeInMB >= 1) {
    return fileSizeInMB.toFixed(2) + " MB";
  } else {
    return fileSizeInKB.toFixed(2) + " KB";
  }
}
