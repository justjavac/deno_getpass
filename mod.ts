import { encode, decode } from "https://deno.land/std/encoding/utf8.ts";

const CTRLC = "\u0003";
const CTRLD = "\u0004";
const BACKSPACE = "\u007F";

export default function getpass(prompt = "Password: "): string | null {
  Deno.setRaw(Deno.stdin.rid, true);

  Deno.stdout.writeSync(encode(prompt));

  let w: string = "";

  for (let thunk of Deno.iterSync(Deno.stdin)) {
    const str = decode(thunk);
    for (let i = 0; i < str.length; ++i) {
      var ch = str[i];
      switch (ch) {
        case "\r":
        case "\n":
        case CTRLD:
          cleanup();
          return w;
        case CTRLC:
          cleanup();
          throw new Error("Aborted");
        case BACKSPACE:
          w = w.slice(0, w.length - 1);
          break;
        default:
          w += ch;
          break;
      }
    }
  }

  return w;
}

function cleanup() {
  Deno.stdout.writeSync(Uint8Array.of(13, 10)); // \r\n
  Deno.setRaw(Deno.stdin.rid, false);
}
