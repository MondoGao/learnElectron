let devServerPort = process.env.PORT || 3000;
let publicPath = `http://localhost:${devServerPort}/dist/`;
const outputPath = resolve(__dirname, 'dist');

export { devServerPort, publicPath, outputPath };
