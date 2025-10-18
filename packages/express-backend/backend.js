import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };


// const findUsersByNameAndJob = (name, job) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name && user["job"] === job
//     );
//   }

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);


// const addUser = (user) => {
//   user["id"] = Math.floor((Math.random()*1000000)).toString();
//   users["users_list"].push(user);
//   return user;
// };


app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});



app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await userServices.findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});



app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
    .then((addedUser) => {
      res.status(201).json(addedUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred adding the user");
    });
});



app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.findUserByIdAndDelete(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("No such user exists.");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred deleting the user.");
    });
});