const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'domains.html', 'contact.html'];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace Navbar Logo
    content = content.replace(
        /<a href="index\.html" class="logo">[\s\S]*?<\/a>/,
        `<a href="index.html" class="logo" style="display:flex; align-items:center;">
                    <img src="010.svg" alt="سلاسل بابل" class="logo-img">
                </a>`
    );

    // Replace Footer Logo
    content = content.replace(
        /<a href="index\.html" class="logo footer-logo">[\s\S]*?<\/a>/,
        `<a href="index.html" class="logo footer-logo" style="display:inline-block;">
                    <img src="010.svg" alt="سلاسل بابل" class="footer-logo-img">
                </a>`
    );

    // Replace Hero image in index.html specifically
    if (file === 'index.html') {
        content = content.replace(
            /<div class="hero-image glass-effect fade-in-up delay-1">[\s\S]*?<h3>SALASEL BABEL<\/h3>\s*<\/div>\s*<\/div>/,
            `<div class="hero-image fade-in-up delay-1">
                    <img src="010.svg" alt="Salasel Babel" style="max-width: 80%; max-height: 380px; object-fit: contain; mix-blend-mode: multiply;">
                </div>`
        );
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}
