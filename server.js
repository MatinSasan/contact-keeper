const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

app.get('/', (req, res, next) => {
  res.json({ msg: 'testing this' });
});

// routes
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/contacts/', require('./routes/contacts'));

//  Serve static assets in porduction
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res, next) =>
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
