import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connnectDB';

require('dotenv').config();

var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log('>>> run into my middleware');
    console.log(req.body);
    // console.log(req.body);
    next();
})

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup view engine
configViewEngine(app);

//Init web route
initWebRoute(app);

//Init API Route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

