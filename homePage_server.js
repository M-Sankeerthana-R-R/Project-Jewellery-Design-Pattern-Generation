const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/jewelryUploadDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const imageSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), (req, res) => {
    const newImage = new Image({
        name: req.file.originalname,
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });

    newImage.save()
        .then((savedImage) => {
            res.json({
                message: 'Image uploaded successfully!',
                imageId: savedImage._id
            });
        })
        .catch(err => res.status(400).json({ error: 'Error saving image: ' + err }));
});

app.get('/image/:id', (req, res) => {
    const id = req.params.id;
    Image.findById(id).then(image => {
      if (image) {
        res.set('Content-Type', image.img.contentType);
        res.send(image.img.data);
      } else {
        res.status(404).send('Image not found');
      }
    }).catch(err => {
        res.status(400).send('Error retrieving image: ' + err);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homePage.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
