# deno_getpass

Safely read passwords in a console application on Linux, OSX and Windows.

## Try it

```bash
deno run --unstable https://deno.land/x/getpass/example.ts
```

## Permissions

- `--unstable`

## Usage

```ts
import getpass from "https://deno.land/x/getpass/mod.ts";

const pw = getpass();
console.log("Your password is: %s", pw);
```

**If enter <kbd>Ctrl + C</kbd>, will return `undefined`.**


## License

[deno_getpass](https://github.com/justjavac/deno_getpass) is released under the
MIT License. See the bundled [LICENSE](./LICENSE) file for details.
