var db = require('./db');
var express = require('express');
var cors = require('cors');
var app = express();
const autosController = require('./controllers/autos');
var bodyParser = require('body-parser');


const int = setInterval(() => {
  console.log('trying to connect to db...');
  db.connection.authenticate().then(() => {
    console.log("Db connected!");
    clearInterval(int);
  }).catch(err => {
    console.error('Db is not connected', err);
  });
}, 3000);


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
let port = 8080;


app.get('/common', autosController.common);

app.post('/addBrand', autosController.addBrand);
app.post('/addModel', autosController.addModel);

app.get('/auto', autosController.all);
app.get('/auto/:id', autosController.getById);
app.put('/auto/:id', autosController.updateAuto);
app.delete('/auto/:id', autosController.deleteAuto);
app.post('/create', autosController.create);

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
