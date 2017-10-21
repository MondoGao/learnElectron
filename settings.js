let devServerPort = process.env.PORT || 3000;
let publicPath = `http://localhost:${devServerPort}/dist/`;

export { devServerPort, publicPath };
