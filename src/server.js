import defaultExport, * as variable from './variables.js'

export default (() => {
    const app = variable.express();
    app.listen(3000, () => console.log(`I'm listening at http://localhost:3000`));
    app.use(express.static('public'));
    
    app.post('/tally', (req, res) => {
        console.log(req)
        // res.render('./public/index.html')
    })
})();