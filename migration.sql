DROP TABLE IF EXISTS pet;

CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    kind TEXT NOT NULL
);

INSERT INTO pet (name, age, kind) VALUES ('bob' , 2, 'snake');


-- Why servers?

-- Client-side code is constrained to the environment in which it runs.
-- servers allows us to take requests and provide resources, return data.
-- Servers allow us to collect data from users and store it.
-- Interact with a database directly.
-- Interact with the file system.

-- Why databases?
-- What does this allow us to do by having databases in particular?

-- Long-term storage of relational data.
-- Effecient retrieval of that data



