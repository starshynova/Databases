import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const create_database_query = `CREATE DATABASE IF NOT EXISTS papers`;
const use_database_query = `USE papers`;

const create_table_authors_query = `CREATE TABLE IF NOT EXISTS authors(
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT(100),
    gender VARCHAR(100)
  )`;
  
const add_column_mentor_query = `ALTER TABLE authors ADD mentor INT`;
  
const add_relationship_author_mentor = `ALTER TABLE authors
  ADD CONSTRAINT foreign_key_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_id)
  ON DELETE SET NULL`;

const create_table_research_papers_query = `CREATE TABLE IF NOT EXISTS research_Papers(
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255) NOT NULL,
  conference VARCHAR(255),
  publish_date DATE
)`;

const create_table_author_paper_query = `CREATE TABLE IF NOT EXISTS author_paper(
    author_id INT,
    paper_id INT,
    UNIQUE KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    )`;

try {
    await connection.query(create_database_query);
    await connection.query(use_database_query);
    await connection.query(create_table_authors_query);
    await connection.query(add_column_mentor_query);    
    await connection.query(add_relationship_author_mentor);
    await connection.query(create_table_research_papers_query);
   await connection.query(create_table_author_paper_query);
} catch (err) {
    console.error('Error connection', err);
} finally {
    connection.end();
};