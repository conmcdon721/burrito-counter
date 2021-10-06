import varObj from './variables.js'

export default (() => {
    const app = varObj.express();
    app.listen(3000, () => console.log(`I'm listening at http://localhost:3000`));
    app.use(varObj.express.static('public'));
})();