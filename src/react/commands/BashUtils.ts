import { executeCommandSync, executeCommandSyncReturnStdout } from "./ExecuteCommand";

import { accessSync, constants, statSync } from "fs";

const doesFileExist = (filename: string): boolean => {
  try {
    accessSync(filename, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const doesDirectoryExist = (directory: string): boolean => {
  if (doesFileExist(directory)) {
    return statSync(directory).isDirectory();
  }
  return false;
}

const isDirectoryWritable = (directory: string): boolean => {
  try {
    accessSync(directory, constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

//TODO: add error handling
const readlink = (file: string): string => {
  return executeCommandSyncReturnStdout("readlink -f " + file).trim();
}

const which = (tool: string): boolean => {
  const cmd = "which " + tool;
  const result = executeCommandSync(cmd);
  return result == 0;
}

const uname = (): string => {
  return executeCommandSyncReturnStdout("uname").trim();
}

export {
  doesFileExist,
  doesDirectoryExist,
  isDirectoryWritable,
  readlink,
  uname,
  which
};