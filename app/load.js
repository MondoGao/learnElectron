const scripts = [];

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'develop') {
  scripts.push(`http://localhost:${port}/dist/renderer.dev.js`);
} else {
  scripts.push('./dist/renderer.prod.js');
}

document.write(
  scripts
    .map(script => `<script defer src="${script}"></script\>`)
    .join('')
);
