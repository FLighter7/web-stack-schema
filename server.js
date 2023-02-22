const path = require('path');
const express = require('express');

const port = 3000;
const dir = __dirname;
const app = express();

app.use(express.static(dir));
app.get('/', (req, res) => res.sendFile(path.join(dir, 'index.html')));
app.listen(port, () => console.log(`Server started on port: ${port}`));
