const fs = require('fs');
const html = fs.readFileSync('C:/Users/aryan/.gemini/antigravity-ide/brain/f606c314-14a2-4a8b-bd2e-a46573703942/.system_generated/steps/1224/content.md', 'utf8');

const clientBootstrapMatch = html.match(/<script type="application\/json" id="client-bootstrap"[^>]*>([\s\S]*?)<\/script>/);

if (clientBootstrapMatch) {
  try {
    const data = JSON.parse(clientBootstrapMatch[1]);
    console.log("Found client-bootstrap");
    // Let's dump out strings that look like conversation content
    const strData = JSON.stringify(data);
    // Find all mapping message nodes
    const matches = strData.match(/"parts":\["([^"]+)"\]/g);
    if (matches) {
      matches.forEach(m => console.log(m));
    } else {
        console.log("No parts found in json");
        
        // try to extract any long text string
        const longStrings = strData.match(/"([^"]{100,})"/g);
        if (longStrings) {
            longStrings.forEach(s => {
                if (s.includes("Desktop") || s.includes("Phase") || s.includes("cat")) {
                    console.log("Potential content: ", s.substring(0, 200) + '...');
                }
            });
        }
    }
  } catch (e) {
    console.error("JSON parse error", e);
  }
} else {
  console.log("No client-bootstrap script found");
}

// Try remix context
const remixMatch = html.match(/<script[^>]*__REMIX_CONTEXT[^>]*>([\s\S]*?)<\/script>/);
if (remixMatch) {
    console.log("Found REMIX context");
    // Just find large text blocks
    const strData = remixMatch[1];
    const longStrings = strData.match(/"([^"]{100,})"/g);
        if (longStrings) {
            longStrings.forEach(s => {
                if (s.includes("Desktop") || s.includes("Phase") || s.includes("cat")) {
                    console.log("Potential content: ", s.substring(0, 200) + '...');
                }
            });
        }
}
