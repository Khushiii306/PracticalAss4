const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const prodRoute = require("./routes/products");
const comRoute = require("./routes/company");
const selRoute = require("./routes/seller");

app.get('/', (req, res) => res.send('Hello World!'));

app.use("/products", prodRoute);
app.use("/company", comRoute);
app.use("/seller", selRoute);

app.listen(port, () => console.log(`Server running on port 5000!`));