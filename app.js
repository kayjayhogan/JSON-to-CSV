const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
const PORT = 3001;

const app = express();

app.use('/', routes);
app.use(express.static(path.resolve(__dirname, './public')));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');



app.listen(PORT, () => { console.log("App is listening on PORT ", PORT) });


