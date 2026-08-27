const tokenPattern =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*'|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|\b(import|from|export|default|const|let|function|return|if|else|for|while|new|class|extends|async|await|type|interface|of|in)\b|([A-Za-z_$][\w$]*)(?=\s*\()|\b([A-Za-z_$][\w$]*)\b/g;

// Minimal JSX/TSX tokenizer for display only — good enough for source viewing
// without pulling a full highlighter into the bundle. Colors come from the
// --code-* tokens in index.css so they follow the theme.
export function tokenize(code) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  while ((match = tokenPattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    }
    const [full, comment, str, num, kw, fn] = match;
    if (comment) tokens.push({ text: full, type: "comment" });
    else if (str) tokens.push({ text: full, type: "string" });
    else if (num) tokens.push({ text: full, type: "number" });
    else if (kw) tokens.push({ text: full, type: "keyword" });
    else if (fn) tokens.push({ text: full, type: "function" });
    else tokens.push({ text: full, type: "plain" });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "plain" });
  }
  return tokens;
}

export function tokenizeLines(code) {
  return code.replace(/\n$/, "").split("\n").map(tokenize);
}