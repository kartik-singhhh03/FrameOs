/**
 * syntaxHighlight.ts
 * Lightweight, export-safe, synchronous syntax highlighter.
 * No external dependencies — works identically in browser and html-to-image export.
 *
 * Supports: TypeScript · JavaScript · TSX · JSX · Python · Go · Rust · Bash/Shell · CSS
 */

// ── Token colours (VSCode Dark+ palette) ─────────────────────────────────────
export const EDITOR_COLORS = {
  bg: "#1e1e2e",
  titleBar: "#13131f",
  lineNum: "#444f5c",
  cursor: "#6c6ef2",
  kw: "#C792EA", // keywords
  str: "#C3E88D", // strings
  cmt: "#546E7A", // comments
  num: "#F78C6C", // numbers
  type: "#82AAFF", // types / capitalized identifiers
  fn: "#82AAFF", // function call names
  op: "#89DDFF", // operators & punctuation
  plain: "#CDD6F4", // default text
  dot: ["#ff5f57", "#febc2e", "#28c840"] as const,
};

export type ColoredToken = { text: string; color: string };

// ── Language keyword tables ───────────────────────────────────────────────────
const JS_KW = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "async",
  "await",
  "of",
  "from",
  "as",
  // TS-specific
  "interface",
  "type",
  "namespace",
  "declare",
  "readonly",
  "public",
  "private",
  "protected",
  "abstract",
  "override",
  "implements",
  "module",
  "keyof",
  "infer",
  "satisfies",
  "using",
  "never",
  "any",
  "unknown",
  "object",
]);

const PY_KW = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
  "self",
  "cls",
  "print",
  "len",
  "range",
  "type",
  "int",
  "str",
  "float",
  "bool",
  "list",
  "dict",
  "set",
  "tuple",
]);

const GO_KW = new Set([
  "break",
  "case",
  "chan",
  "const",
  "continue",
  "default",
  "defer",
  "else",
  "fallthrough",
  "for",
  "func",
  "go",
  "goto",
  "if",
  "import",
  "interface",
  "map",
  "package",
  "range",
  "return",
  "select",
  "struct",
  "switch",
  "type",
  "var",
  "nil",
  "true",
  "false",
  "error",
  "string",
  "int",
  "float64",
  "float32",
  "bool",
  "byte",
  "rune",
  "make",
  "new",
  "append",
  "len",
  "cap",
  "close",
  "delete",
  "copy",
  "panic",
  "recover",
  "println",
  "fmt",
]);

const RUST_KW = new Set([
  "as",
  "async",
  "await",
  "break",
  "const",
  "continue",
  "crate",
  "dyn",
  "else",
  "enum",
  "extern",
  "false",
  "fn",
  "for",
  "if",
  "impl",
  "in",
  "let",
  "loop",
  "match",
  "mod",
  "move",
  "mut",
  "pub",
  "ref",
  "return",
  "self",
  "Self",
  "static",
  "struct",
  "super",
  "trait",
  "true",
  "type",
  "union",
  "unsafe",
  "use",
  "where",
  "while",
  "i32",
  "i64",
  "u32",
  "u64",
  "f32",
  "f64",
  "usize",
  "isize",
  "bool",
  "str",
  "String",
  "Vec",
  "Option",
  "Result",
  "Some",
  "None",
  "Ok",
  "Err",
]);

const CSS_KW = new Set([
  "display",
  "flex",
  "grid",
  "block",
  "inline",
  "none",
  "auto",
  "center",
  "start",
  "end",
  "space-between",
  "space-around",
  "column",
  "row",
  "wrap",
  "nowrap",
  "relative",
  "absolute",
  "fixed",
  "sticky",
  "hidden",
  "overflow",
  "visible",
  "background",
  "color",
  "font",
  "border",
  "margin",
  "padding",
  "width",
  "height",
  "max",
  "min",
  "top",
  "bottom",
  "left",
  "right",
  "position",
  "z-index",
  "opacity",
  "transform",
  "transition",
  "cursor",
]);

function keywordsFor(lang: string): Set<string> {
  const l = lang.toLowerCase();
  if (l === "py" || l === "python") return PY_KW;
  if (l === "go") return GO_KW;
  if (l === "rs" || l === "rust") return RUST_KW;
  if (l === "css" || l === "scss" || l === "less") return CSS_KW;
  return JS_KW; // js, ts, jsx, tsx, javascript, typescript, default
}

// ── Tokenizer ─────────────────────────────────────────────────────────────────

/**
 * Tokenize a single source line into coloured spans.
 * Works without knowledge of multi-line state (good enough for most snippets).
 */
function tokenizeLine(
  line: string,
  kw: Set<string>,
  isPython: boolean,
  isShell: boolean,
): ColoredToken[] {
  const tokens: ColoredToken[] = [];
  let i = 0;
  const c = EDITOR_COLORS;

  while (i < line.length) {
    const ch = line[i];

    // ── Single-line comment ─────────────────────────────────────────────────
    if (!isShell && ch === "/" && line[i + 1] === "/") {
      tokens.push({ text: line.slice(i), color: c.cmt });
      break;
    }
    if ((isPython || isShell) && ch === "#") {
      tokens.push({ text: line.slice(i), color: c.cmt });
      break;
    }

    // ── String literal ──────────────────────────────────────────────────────
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\" && quote !== "`") {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ text: line.slice(i, j), color: c.str });
      i = j;
      continue;
    }

    // ── Number ───────────────────────────────────────────────────────────────
    if (/\d/.test(ch) && (i === 0 || /\W/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.eExXa-fA-F_]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: c.num });
      i = j;
      continue;
    }

    // ── Identifier / keyword / type / function call ──────────────────────────
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      let color: string;
      if (kw.has(word)) {
        color = c.kw;
      } else if (/^[A-Z]/.test(word) && word.length > 1) {
        color = c.type;
      } else if (j < line.length && line[j] === "(") {
        color = c.fn;
      } else {
        color = c.plain;
      }

      tokens.push({ text: word, color });
      i = j;
      continue;
    }

    // ── Operator / punctuation ────────────────────────────────────────────────
    if (/[=!<>|&+\-*/%?:]/.test(ch)) {
      tokens.push({ text: ch, color: c.op });
      i++;
      continue;
    }

    // ── Fallthrough (space, bracket, comma, etc.) ─────────────────────────────
    tokens.push({ text: ch, color: c.plain });
    i++;
  }

  return tokens;
}

/**
 * Main export.
 * Returns one array of ColoredToken per source line.
 */
export function tokenize(code: string, language: string): ColoredToken[][] {
  const lang = language.toLowerCase();
  const isPython = lang === "py" || lang === "python";
  const isShell =
    lang === "bash" || lang === "sh" || lang === "shell" || lang === "zsh";
  const kw = keywordsFor(lang);

  return code
    .split("\n")
    .map((line) => tokenizeLine(line, kw, isPython, isShell));
}
