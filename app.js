import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
let data = ["Project 1", "Project 2", "Project 3"]

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/projects", (req, res) => {
    res.render("projects.ejs", {projectArray: data});
});

app.get("/project/:id", (req,res) => {
let id = req.params.id;
if(id > data.length){
throw new Error("No project with that ID");
}
res.render("project.ejs", {projectArray: data, which: id})
});


app.get("/aboutme", (req, res) => {
    res.render("aboutme.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
    await utils
    .sendMessage (req.body.sub, req.body.txt)
    .then(() => {
    res.send({result: "success" });
    })
    .catch(() => {
    res.send({ result: "failure" });
    });
});

app.use(async (err, req, res, next) => {
    console.log(err);
    res.render("error.ejs");
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
}); 