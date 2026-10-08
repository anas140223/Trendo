const express = require('express');
const Usaroutes = require('../src/routes/Usaroutes.js')
const Ukroutes = require('../src/routes/Ukroutes.js')
const Euroroutes = require('../src/routes/Euroroutes.js')
const Gccroutes = require('../src/routes/Gccroutes.js')
const Ausroutes = require('../src/routes/Ausroutes.js') 
const app = express();
const path = require('path');
const cors = require('cors')

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usa', Usaroutes)
app.use('/api/uk', Ukroutes)
app.use('/api/euro', Euroroutes)
app.use('/api/gcc', Gccroutes)
app.use('/api/aus', Ausroutes)

//------officialgov-----------------

app.get('/', (req, res) => {
  res.json({ message: 'Trendo API is running' });
});
///---------+- gcc,-----------------

module.exports = app;
