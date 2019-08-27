const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({ msg: 'testing this' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
