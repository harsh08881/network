const express = require("express");
require("dotenv").config(); 
const cors = require('cors');
const router = require('./src/routes')
const errorHandler = require('./src/middleware/errorhandler')
const app = express();
const PORT = process.env.PORT || 5020;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cors()); 

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
  });
app.use('/user', router)


app.get('*' , (req,res) => {
  res.send("Handle By *");
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;