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
const newPost = {
        creator: req.body.creator,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        date: new Date()     // timestamp post with current date and time
    };

    postArray.unshift(newPost); // insert new post at the beginning so it shows up at the top of the list
    res.redirect("/"); // force reload page to see new post
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