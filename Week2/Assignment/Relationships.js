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

const insert_authors_query = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES 
    ('John Doe', 'Harvard', 1980-05-15, 35, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Alice Green')),
    ('Jane Smith', 'Stanford', 1985-03-10, 42, 'Female', (SELECT author_id FROM authors WHERE author_name = 'John Doe')),
    ('Alice Green', 'MIT', 1990-07-22, 28, 'Female', (SELECT author_id FROM authors WHERE author_name = 'Jane Smith')),
    ('Michael Brown', 'Cambridge', 1975-11-30, 50, 'Male'),
    ('Emily White', 'Harvard', 1992-04-05, 18, 'Female', (SELECT author_id FROM authors WHERE author_name = 'John Doe')),
    ('Robert Black', 'Oxford', 1983-08-19, 40, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Michael Brown')),
    ('Sophia Johnson', 'Stanford', 1989-01-25, 30, 'Female', (SELECT author_id FROM authors WHERE author_name = 'Jane Smith')),
    ('Daniel Martinez', 'MIT', 1982-03-17, 37, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Alice Green')),
    ('Olivia Brown', 'Cambridge', 1995-12-14, 15, 'Female', SELECT author_id FROM authors WHERE author_name = 'Michael Brown')),
    ('James Wilson', 'Oxford', 1987-07-10, 25, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Robert Black')),
    ('Isabella Clark', 'Harvard', 1994-09-23, 22, 'Female', (SELECT author_id FROM authors WHERE author_name = 'John Doe')),
    ('Liam Walker', 'Stanford', 1990-06-18, 33, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Jane Smith')),
    ('Mia Hall', 'Cambridge', 1986-02-11, 38, 'Female', (SELECT author_id FROM authors WHERE author_name = 'Emily White')),
    ('Noah Lee', 'MIT', 1993-11-08, 20, 'Male', (SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez')),
    ('Amelia Young', 'Oxford', 1981-05-21, 45, 'Female')`;  

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