import express from "express";

const app = express();
const port = 3000;

let postArray = []; // posts are indexed via this array

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // allows for parsing of form data

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
        date: new Date() // timestamp post with current date and time
    };

    postArray.unshift(newPost); // insert new post at the beginning so it shows up at the top of the list
    res.redirect("/"); // force reload page to see new post
});

app.get("/edit/:index", (req, res) => {
    const postIndex = Number(req.params.index); // grab index from URL
    const post = postArray[postIndex];

    // handle incorrect post index or user manually inputting a post index
    if (!post) {
        return res.redirect("/");
    }

    res.render("edit.ejs", {
        index: postIndex,
        post // supply post data to pre-populate form fields in edit.ejs
    });
});

app.post("/edit/:index", (req, res) => {
    const postIndex = Number(req.params.index); // grab index from URL
    const post = postArray[postIndex];

    // again handle incorrect post index or user manually inputting a post index
    if (!post) {
        return res.redirect("/");
    }

    // update postArray data with form data, whether or not it was changed by the user
    post.creator = req.body.creator;
    post.title = req.body.title;
    post.category = req.body.category;
    post.content = req.body.content;

    res.redirect("/"); // force reload page to see updated post
});

app.delete("/delete/:index", (req, res) => {
    const postIndex = Number(req.params.index); // grab index from URL
    postArray.splice(postIndex, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});