# deno_getpass

[![tag](https://img.shields.io/github/release/justjavac/deno_getpass)](https://github.com/justjavac/deno_getpass/releases)
[![Build Status](https://github.com/justjavac/deno_getpass/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno_getpass/actions)
[![license](https://img.shields.io/github/license/justjavac/deno_getpass)](https://github.com/justjavac/deno_getpass/blob/master/LICENSE)

Safely read passwords in a console application on Linux, OSX and Windows.

## Permissions

- `--unstable`

## Usage

```ts
import getpass from "https://deno.land/x/getpass/mod.ts";

const pw: string = getpass();
```

**If enter <kbd>Ctrl + C</kbd>, will return `undefined`.**

## License

[deno_getpass](https://github.com/justjavac/deno_getpass) is released under the MIT License. See the bundled [LICENSE](./LICENSE) file for details.
