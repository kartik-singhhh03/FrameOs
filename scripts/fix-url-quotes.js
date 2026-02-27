const fs = require("fs");
const path = require("path");
const glob = require("fs");

const dir = path.resolve(__dirname, "../src/components/templates");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));

let fixed = 0;
for (const file of files) {
  const full = path.join(dir, file);
  let src = fs.readFileSync(full, "utf8");
  const before = src;

  // Replace all occurrences of:   url("data:   →   url(data:
  // And the corresponding closing  %3E")   →   %3E)
  // Pattern: url(" followed by data: ... then SVG end ...  ") → url(data:...  )
  src = src.replace(/url\("(data:[^"]+)"\)/g, "url($1)");

  if (src !== before) {
    fs.writeFileSync(full, src, "utf8");
    console.log("✓ fixed", file);
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files.`);
