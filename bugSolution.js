const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
};

app.use(handleError);

app.get('/users/:id', (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    const err = new Error('Invalid user ID');
    err.status = 400; // Bad Request
    next(err);
    return;
  }
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});