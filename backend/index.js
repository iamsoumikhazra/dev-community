const express = require("express");
const app = express();
const axios = require("axios");

// Middleware to parse JSON request bodies
app.use(express.json());

let users = [
  {
    id: 1,
    name: "soumik",
    email: "soumik@123",
    password: "soumik123",
    linkedin: "soumik",
    twitter: "soumik",
    github: "https://github.com/iamsoumikhazra",
    img: "https://avatars.githubusercontent.com/u/76480123"
  },
  {
    id: 2,
    name: "soumik",
    email: "soumik@123",
    password: "soumik123",
    linkedin: "soumik",
    github: "soumik",
    twitter: "soumik",
  },
];

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const { github } = req.body;

  if (!github) {
    return res.status(400).json({ error: "GitHub ID is required" });
  }

  try {
    const githubResponse = await axios.get(`https://api.github.com/users/${github}`);
    const githubData = githubResponse.data;

    const newUser = {
      id: users.length + 1, 
      ...req.body,
      github: githubData.html_url,
      img: githubData.avatar_url
    };

    users.push(newUser);
    res.status(201).json(newUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
