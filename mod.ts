import { iterateReaderSync } from "https://deno.land/std@0.145.0/streams/conversion.ts";

// https://en.wikipedia.org/wiki/ASCII#End_of_File/Stream
const CTRLC = 0x03; // ^C (ETX, End of Text)
const CTRLD = 0x04; // ^D (EOT, End of Transmission)
const BACKSPACE = 0x7F; // ^? (DEL, Delete)
const LF = 0x0A; // \n, Line Feed
const CR = 0x0D; // \r, Carriage Return

export default function getpass(prompt = "Password: "): string | undefined {
  Deno.setRaw(Deno.stdin.rid, true);

  Deno.stdout.writeSync(new TextEncoder().encode(prompt));

  const w: number[] = [];
  for (const thunk of iterateReaderSync(Deno.stdin)) {
    for (let i = 0; i < thunk.length; ++i) {
      const ch = thunk[i];
      switch (ch) {
        case LF:
        case CR:
        case CTRLD:
          cleanup();
          return new TextDecoder().decode(Uint8Array.from(w));
        case CTRLC:
          cleanup();
          return;
        case BACKSPACE:
          w.pop();
          break;
        default:
          w.push(ch);
          break;
      }
    }
  }
}

function cleanup() {
  Deno.stdout.writeSync(Uint8Array.of(CR, LF)); // \r\n
  Deno.setRaw(Deno.stdin.rid, false);
}
