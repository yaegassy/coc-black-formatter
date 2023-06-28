# coc-black-formatter

[microsoft/vscode-black-formatter](https://github.com/microsoft/vscode-black-formatter)'s langauge server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

## Install

**CocInstall**:

> TODO

**When using a plugin manager, etc**:

> e.g. vim-plug

```vim
Plug 'yaegassy/coc-black-formatter', {'do': 'yarn install --frozen-lockfile'}
```

## Server Install

[coc-black-formatter](https://github.com/yaegassy/coc-black-formatter/) allows you to create an extension-only "venv" and install `microsoft/vscode-black-formatter's langauge server`.

When using [coc-black-formatter](https://github.com/yaegassy/coc-black-formatter/) for the first time, if `microsoft/vscode-black-formatter's langauge server` is not present in the runtime environment, you will be prompted to do a built-in install.

To use the built-in installation feature, execute the following command.

```vim
:CocCommand black-formatter.installServer
```

## Note

### Detecting the "black" command from the execution environment

The `black` command used by `microsoft/vscode-black-formatter's langauge server` is the `black` command of the python environment installed with `microsoft/vscode-black-formatter's langauge server`.

To use the `black` command installed in the virtual environment of a project created by `venv`, `poetry`, etc., `black-formatter.path` must be set to an absolute path.

[coc-black-formatter](https://github.com/yaegassy/coc-black-formatter/) adds the feature to automatically detect `black` commands in the execution environment and use them in `microsoft/vscode-black-formatter's langauge server`.

If you do not need this feature, set `black-formatter.useDetectBlackCommand` to `false`.

**coc-settings.json**:

```jsonc
{
  "black-formatter.useDetectBlackCommand": false
}
```

### When used with other coc-extensions for python that provide formatting feature

For example, [coc-pyright](https://github.com/fannheyward/coc-pyright) provides a formatting feature.

If [coc-black-formatter](https://github.com/yaegassy/coc-black-formatter) and `coc-pyright` are used together, the `coc-pyright` formatting feature should be disabled.

**coc-settings.json**:

```jsonc
{
  "python.formatting.provider": "none",
}
```

## Configuration options

- `black-formatter.enable`: Enable coc-black-formatter extension, default: `true`
- `black-formatter.useDetectBlackCommand`: Automatically detects the black command in the execution environment and sets `black-formatter.path`, default: `true`
- `black-formatter.builtin.pythonPath`: Python 3.x path (Absolute path) to be used for built-in install, default: `""`
- `black-formatter.trace.server`: Traces the communication between coc.nvim and the language server, default: `"off"`

Other settings have the same configuration as [microsoft/vscode-black-formatter](https://github.com/microsoft/vscode-black-formatter).

## Commands

- `black-formatter.restart`: Restart Server
- `black-formatter.installServer`: Install Server
- `black-formatter.showOutput`: Show output channel
- `black-formatter.version`: Show the version of the server installed by the extension

## Thanks

- [microsoft/vscode-black-formatter](https://github.com/microsoft/vscode-black-formatter)

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
