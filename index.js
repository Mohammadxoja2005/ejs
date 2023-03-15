const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const db = require("./models");
const path = require("path");
const cors = require("cors");
// routes
const crud = require("./routes/crud");
const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "public")));
app.use("/css", express.static(path.resolve(__dirname, "public", "css")));
app.use("/js", express.static(path.resolve(__dirname, "public", "js")));
app.use(expressLayouts); 

app.set('view engine', 'ejs');

db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("server started...");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.use('/gettext', crud);

app.get("/", (req, res) => {
    res.render('layout');
})
