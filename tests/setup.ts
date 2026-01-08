import { TextDecoder, TextEncoder } from "util";

(globalThis as { TextDecoder?: typeof TextDecoder }).TextDecoder ??= TextDecoder;
(globalThis as { TextEncoder?: typeof TextEncoder }).TextEncoder ??= TextEncoder;
