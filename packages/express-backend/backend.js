import express from "express";
import cors from "cors";

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


const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Ballerina"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};



const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};


const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  }


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    if (job != undefined) {
        let result = findUsersByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
        return;
    } else {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);}
  } else {
    res.send(users);
  }
});


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// TODO: implement an additional action to get all users that match a given name and a given job


const addUser = (user) => {
  user["id"] = Math.floor((Math.random()*1000000)).toString();
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).json(addedUser);
});


app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let userID = findUserById(id);

  if (userID === undefined) {
    res.status(404).send("No such user exists.");
  } else {
    //console.log(userID);
    users["users_list"] = users["users_list"].filter(
      (user) => user["id"] !== id
    );
    //console.log(users);
    res.status(204).send();
  }
});