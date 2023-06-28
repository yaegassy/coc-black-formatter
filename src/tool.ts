import { ExtensionContext, workspace } from 'coc.nvim';

import fs from 'fs';
import path from 'path';
import which from 'which';

import { EXTENSION_NS } from './constant';

export function getPythonPath(): string {
  let pythonPath = workspace.getConfiguration(EXTENSION_NS).get<string>('builtin.pythonPath', '');
  if (pythonPath) {
    return pythonPath;
  }

  pythonPath = which.sync('python3', { nothrow: true }) || '';
  if (pythonPath) {
    pythonPath = fs.realpathSync(pythonPath);
    return pythonPath;
  }

  pythonPath = which.sync('python', { nothrow: true }) || '';
  if (pythonPath) {
    pythonPath = fs.realpathSync(pythonPath);
    return pythonPath;
  }

  return pythonPath;
}

export function getBlackLspBlackPath(context: ExtensionContext) {
  let toolPath: string | undefined = undefined;

  if (
    fs.existsSync(path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'Scripts', 'black.exe')) ||
    fs.existsSync(path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'bin', 'black'))
  ) {
    if (process.platform === 'win32') {
      toolPath = path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'Scripts', 'black.exe');
    } else {
      toolPath = path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'bin', 'black');
    }
  }

  return toolPath;
}

export function getBlackLspServerInterpreterPath(context: ExtensionContext) {
  let pythonCommandPath: string | undefined = undefined;

  if (
    fs.existsSync(path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'Scripts', 'python.exe')) ||
    fs.existsSync(path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'bin', 'python'))
  ) {
    if (process.platform === 'win32') {
      pythonCommandPath = path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'Scripts', 'python.exe');
    } else {
      pythonCommandPath = path.join(context.storagePath, 'vscode-black-formatter', 'venv', 'bin', 'python');
    }
  }

  return pythonCommandPath;
}

export function getBlackLspServerScriptPath(context: ExtensionContext) {
  let serverScriptPath: string | undefined = undefined;

  if (fs.existsSync(path.join(context.storagePath, 'vscode-black-formatter', 'bundled', 'tool', 'lsp_server.py'))) {
    serverScriptPath = path.join(context.storagePath, 'vscode-black-formatter', 'bundled', 'tool', 'lsp_server.py');
  }

  return serverScriptPath;
}
