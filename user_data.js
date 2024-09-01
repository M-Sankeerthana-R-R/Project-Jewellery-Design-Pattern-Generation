const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/user_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Mongodb connected");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const collection = mongoose.model('data', schema);

