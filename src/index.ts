import { ExtensionContext, LanguageClient, services, window, workspace } from 'coc.nvim';

import fs from 'fs';

import { createLanguageClient } from './client';
import * as installServerCommandFeature from './commands/installServer';
import * as restartCommandFeature from './commands/restart';
import * as showOutputCommandFeature from './commands/showOutput';
import { getBlackLspBlackPath } from './tool';
import { EXTENSION_NS } from './constant';

let client: LanguageClient | undefined;

export async function activate(context: ExtensionContext): Promise<void> {
  if (!workspace.getConfiguration(EXTENSION_NS).get('enable')) return;

  const extensionStoragePath = context.storagePath;
  if (!fs.existsSync(extensionStoragePath)) {
    fs.mkdirSync(extensionStoragePath, { recursive: true });
  }

  const blackLspBlackCommandPath = getBlackLspBlackPath(context);

  if (!blackLspBlackCommandPath) {
    installServerCommandFeature.register(context, client);
    window.showWarningMessage(
      `coc-black-formatter | black-formatter language server does not exist. please execute ":CocCommand ${EXTENSION_NS}.installServer"`
    );
    return;
  }

  client = createLanguageClient(context);
  if (!client) return;
  context.subscriptions.push(services.registLanguageClient(client));

  installServerCommandFeature.register(context, client);
  restartCommandFeature.register(context, client);
  showOutputCommandFeature.register(context, client);
}

export async function deactivate(): Promise<void> {
  if (client) {
    await client.stop();
  }
}
