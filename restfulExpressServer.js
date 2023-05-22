import express from "express";
import pg from "pg";

const server = express();
const PORT = 4000;

const db = new pg.Pool({
    database: "petshop",
    password: "MgDp2436!dag",
    user: "daltonandrews"
});

server.use(express.json());

server.get("/pets", (req, res) => {
    db.query("SELECT * FROM pet").then((result) => {
        res.send(result.rows);
    });
});

server.get("/pets/:id", (req,res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)) {
        res.sendStatus(422);
        return;
    }

 db.query("SELECT * FROM pet WHERE id = $1", [id]).then((result) => {
    if (result.rows.length === 0) {
        res.sendStatus(404);
    } else {
        res.send(result.rows[0]);
    }
 });
});

server.post("/pets", (req, res) => {
    const { name, kind } = req.body;
    const age = Number(req.body.age);

//Validation
if(!kind || Number.isNaN(age) || !name) {
    res.sendStatus(422);
    return;
}

    db.query(
        "INSERT INTO pet (name,age,kind) VALUES ($1, $2, $3) RETURNING *",
        [name,age,kind]
    ).then((result) => {
        res.status(201).send(result.rows[0]);
    });
});

server.delete("/pets/:id", (req,res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)) {
        res.sendStatus(422);
        return;
    }

    db.query("DELETE FROM pet WHERE id = $1 RETURNING *", [id]).then((result) => {
        if(result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows[0]);
        }
    });
});

server.patch("/pets/:id", (req,res) => {
    const id =Number(req.params.id);
const { name, age, kind } = req.body;

db.query(
    "UPDATE pet SET name = COALESCE($1, name), age = COALESCE($2, age), kind = COALESCE($3, kind) WHERE id = $4 RETURNING *",
    [name, age, kind, id]
).then((result) => {
    if (result.rows.length === 0) {
        res.sendStatus(404);
    } else {
        res.send(result.rows[0]);
    }
});
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// if (
//     (!age && !name && !kind) ||
//     (age && Number.isNaN(age)) ||
//     Number.isNaN(petIndex) ||
//     age < 0
// ) {
//     res.sendStatus(422);
//     return;
// }




















