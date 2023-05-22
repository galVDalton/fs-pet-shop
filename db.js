import pg from "pg"

const db = new pg.Pool({
    database: "petshop",
});

db.query("SELECT * FROM pet", [], (error, result) => {
    if(error) {
        throw error;
    }

    console.log(result.rows);
    db.end();
});
