CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT,
    calories INT,
    protein INT,
    fat INT,
    carbs INT,
    prep_time INT,
    servings INT,
    image_url VARCHAR(255)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_time VARCHAR(255),
    image_url VARCHAR(255)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE recipe_steps (
    id SERIAL PRIMARY KEY,
    recipe_id INT,
    title VARCHAR(255),
    description TEXT
);

CREATE TABLE tags_posts(
    tag_id integer NOT NULL,
    post_id integer NOT NULL,
    PRIMARY KEY(tag_id,post_id),
    CONSTRAINT tags_post_id_fkey FOREIGN key(post_id) REFERENCES posts(id)
);

CREATE TABLE tags_recipes(
    tag_id integer NOT NULL,
    recipe_id integer NOT NULL,
    PRIMARY KEY(tag_id,recipe_id),
    CONSTRAINT tags_recipe_id_fkey FOREIGN key(recipe_id) REFERENCES recipes(id)
);

CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    consent_phone BOOLEAN NOT NULL DEFAULT FALSE,
    consent_email BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);