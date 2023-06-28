import { ExtensionContext, LanguageClient, LanguageClientOptions, ServerOptions, workspace } from 'coc.nvim';

import which from 'which';

import { EXTENSION_NS } from './constant';
import { getBlackLspBlackPath, getBlackLspServerInterpreterPath, getBlackLspServerScriptPath } from './tool';

export function createLanguageClient(context: ExtensionContext) {
  const devServerInterpreter = workspace.expand(
    workspace.getConfiguration(EXTENSION_NS).get<string>('dev.serverInterpreter', '')
  );
  const devServerScript = workspace.expand(
    workspace.getConfiguration(EXTENSION_NS).get<string>('dev.serverScript', '')
  );

  const serverInterpreter = devServerInterpreter ? devServerInterpreter : getBlackLspServerInterpreterPath(context);
  const serverScript = devServerScript ? devServerScript : getBlackLspServerScriptPath(context);
  if (!serverInterpreter || !serverScript) return;

  const serverOptions: ServerOptions = {
    command: serverInterpreter,
    args: [serverScript],
  };

  const initializationOptions = getInitializationOptions(context);

  const clientOptions: LanguageClientOptions = {
    synchronize: {
      configurationSection: [EXTENSION_NS],
    },
    documentSelector: ['python'],
    initializationOptions,
  };

  const client = new LanguageClient(EXTENSION_NS, 'black-formatter-lsp', serverOptions, clientOptions);
  return client;
}

type ImportStrategy = 'fromEnvironment' | 'useBundled';
type ShowNotifications = 'off' | 'onError' | 'onWarning' | 'always';

type ExtensionInitializationOptions = {
  globalSettings: {
    args: string[];
    path: string[];
    importStrategy: ImportStrategy;
    interpreter: string[];
    showNotifications: ShowNotifications;
  };
};

function convertFromWorkspaceConfigToInitializationOptions() {
  const settings = workspace.getConfiguration(EXTENSION_NS);

  const initializationOptions = <ExtensionInitializationOptions>{
    globalSettings: {
      args: settings.get('args'),
      path: settings.get('path'),
      importStrategy: settings.get<ImportStrategy>(`importStrategy`) ?? 'fromEnvironment',
      interpreter: settings.get('interpreter'),
      showNotifications: settings.get<ShowNotifications>('showNotifications'),
    },
    settings: {},
  };

  return initializationOptions;
}

function getInitializationOptions(context: ExtensionContext) {
  const initializationOptions = convertFromWorkspaceConfigToInitializationOptions();

  if (workspace.getConfiguration(EXTENSION_NS).get<boolean>('useDetectBlackCommand')) {
    if (initializationOptions.globalSettings.path.length === 0) {
      const envToolCommandPath = which.sync('black', { nothrow: true });
      if (envToolCommandPath) {
        initializationOptions.globalSettings.path = [envToolCommandPath];
      } else {
        const toolPath = getBlackLspBlackPath(context)!;
        initializationOptions.globalSettings.path = [toolPath];
      }
    }
  }

  return initializationOptions;
}
