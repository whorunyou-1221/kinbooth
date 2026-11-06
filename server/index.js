const express = require('express');
const cors = require('cors');
const app = express();
const port = 3007;
const db = require('./models');

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const collageRouter = require('./routes/collage');
const photoRouter = require('./routes/photo');
const photoSessionRouter = require('./routes/photosession');
const photoStickerRouter = require('./routes/photosticker');
const savedPhotoRouter = require('./routes/savedphoto');
const stickerRouter = require('./routes/sticker');
const templateRouter = require('./routes/template');

app.get('/', (req, res) => {
  res.send('KinBooth API is running');
});

app.use('/api/user', userRouter);
app.use('/api/collage', collageRouter);
app.use('/api/photo', photoRouter);
app.use('/api/photosession', photoSessionRouter);
app.use('/api/photosticker', photoStickerRouter);
app.use('/api/savedphoto', savedPhotoRouter);
app.use('/api/sticker', stickerRouter);
app.use('/api/template', templateRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`KinBooth server running at http://localhost:${port}`);
  });
});
