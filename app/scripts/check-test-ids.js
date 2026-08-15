const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  }
  return filelist;
};

const componentsDir = path.join(__dirname, '../frontend/src');
const files = walkSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));

let totalViolations = 0;

function findInteractiveOpeningTags(content) {
  const tags = [];
  const startRegex = /<(button|input|a)\b/gi;
  let match;

  while ((match = startRegex.exec(content)) !== null) {
    let braceDepth = 0;
    let quote = null;
    let escaped = false;

    for (let index = startRegex.lastIndex; index < content.length; index += 1) {
      const character = content[index];

      if (quote) {
        if (escaped) {
          escaped = false;
        } else if (character === '\\') {
          escaped = true;
        } else if (character === quote) {
          quote = null;
        }
        continue;
      }

      if (character === '"' || character === "'" || character === '`') {
        quote = character;
      } else if (character === '{') {
        braceDepth += 1;
      } else if (character === '}') {
        braceDepth = Math.max(0, braceDepth - 1);
      } else if (character === '>' && braceDepth === 0) {
        tags.push(content.slice(match.index, index + 1));
        startRegex.lastIndex = index + 1;
        break;
      }
    }
  }

  return tags;
}

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  let violationsInFile = 0;
  let fileOutput = '';

  for (const fullTag of findInteractiveOpeningTags(content)) {
    if (!fullTag.includes('data-testid')) {
      violationsInFile++;
      fileOutput += `  - ${fullTag.substring(0, 80).replace(/\s+/g, ' ')}...\n`;
    }
  }

  if (violationsInFile > 0) {
    console.log(`\nViolations found in ${file}:`);
    console.log(fileOutput);
    totalViolations += violationsInFile;
  }
}

if (totalViolations > 0) {
    console.error(`\nERROR: Found ${totalViolations} interactive elements missing data-testid attributes.`);
    process.exit(1);
} else {
    console.log('SUCCESS: All checked interactive elements have data-testid attributes.');
    process.exit(0);
}
