import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const create_database_query = `CREATE DATABASE IF NOT EXISTS authors`;
const use_database_query = `USE authors`;

const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
const create_table_authors_query = `CREATE TABLE authors(
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT(100),
  gender VARCHAR(100)
)`;

const drop_table_author_mentor_query = `DROP TABLE IF EXISTS author_mentor`;
const create_table_author_mentor_query = `CREATE TABLE author_mentor(
    author_id INT NOT NULL,
    mentor_id INT NOT NULL,
    PRIMARY KEY (author_id, mentor_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES authors(author_id) ON DELETE CASCADE)
`;

try {
    await connection.query(create_database_query);
    await connection.query(use_database_query);
    await connection.query(drop_table_author_mentor_query);
    await connection.query(drop_table_authors_query);
    await connection.query(create_table_authors_query);
    await connection.query(create_table_author_mentor_query);
} catch (err) {
    console.error('Error connection', err);
} finally {
    connection.end();
};

