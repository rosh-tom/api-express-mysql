const express = require('express');  

const app = express();
const port = 3000;


// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "Welcome to the world. hello world"});
});

require("./routes/customers.route")(app);

app.listen(port, () => {
    console.log(`Server is running.. http://localhost:${port}`);
});