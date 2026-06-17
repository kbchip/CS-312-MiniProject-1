import express from "express";

const app = express();
const port = 3000;

let postArray = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: postArray
    });
});

app.post("/create", (req, res) => {
    // TODO: create new post
});

app.patch("/edit", (req, res) => {
    // TODO: edit existing post
});

app.delete("/delete", (req, res) => {
    // TODO: delete existing post
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});