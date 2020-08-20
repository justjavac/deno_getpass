import { encode, decode } from "https://deno.land/std/encoding/utf8.ts";

// https://en.wikipedia.org/wiki/ASCII#End_of_File/Stream
const CTRLC = 0x03;  // ^C (ETX, End of Text)
const CTRLD = 0x04; // ^D (EOT, End of Transmission)
const BACKSPACE = 0x7F; // ^? (DEL, Delete)
const LF = 0x0A; // \n, Line Feed
const CR = 0x0D; // \r, Carriage Return

export default function getpass(prompt = "Password: "): string | null {
  Deno.setRaw(Deno.stdin.rid, true);

  Deno.stdout.writeSync(encode(prompt));

  const w: number[] = [];

  for (let thunk of Deno.iterSync(Deno.stdin)) {
    for (let i = 0; i < thunk.length; ++i) {
      const ch = thunk[i];
      switch (ch) {
        case LF:
        case CR:
        case CTRLD:
          cleanup();
          return decode(Uint8Array.from(w));
        case CTRLC:
          cleanup();
          throw new Error("Aborted");
        case BACKSPACE:
          w.pop()
          break;
        default:
          w.push(ch)
          break;
      }
    }
  }

  return decode(Uint8Array.from(w));
}

function cleanup() {
  Deno.stdout.writeSync(Uint8Array.of(CR, LF)); // \r\n
  Deno.setRaw(Deno.stdin.rid, false);
}
