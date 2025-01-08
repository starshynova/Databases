import { createConnection } from 'mysql2/promise';


    // const connection = await createConnection({
    //     host: 'localhost
// const connection = await createConnection({
//   host: 'localhost',
//   user: 'hyfuser',
//   password: 'hyfpassword',
// });

export async function keys(connection) {
const create_database_query = `CREATE DATABASE IF NOT EXISTS test`;
const use_database_query = `USE test`;

const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
const create_table_authors_query = `CREATE TABLE IF NOT EXISTS authors(
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT(100),
  gender VARCHAR(100)
)`;

// const drop_table_author_mentor_query = `DROP TABLE IF EXISTS author_mentor`;
// const create_table_author_mentor_query = `CREATE TABLE author_mentor(
//     author_id INT NOT NULL,
//     mentor_id INT NOT NULL,
//     PRIMARY KEY (author_id, mentor_id),
//     FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
//     FOREIGN KEY (mentor_id) REFERENCES authors(author_id) ON DELETE CASCADE)
// `;

async function check_column_exists_query (connection) {
const [results, fields] = await connection.query(`SHOW COLUMNS FROM authors LIKE 'mentor_id'`);
console.log('column exists', results);
if (results.length === 0) {
    const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
    ON DELETE CASCADE`;
    await connection.query(add_column_mentor_query);
}
}

// const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
// ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
//     ON DELETE CASCADE`;

try {
    await connection.query(create_database_query);
    await connection.query(use_database_query);
    // await connection.query(drop_table_author_mentor_query);
    await connection.query(drop_table_authors_query);
    await connection.query(create_table_authors_query);
    // await connection.query(create_table_author_mentor_query);
  await check_column_exists_query(connection);
    // await connection.query(add_column_mentor_query);
    // await check_column_exists_query(connection);
} catch (err) {
    console.error('Error KEYS inside connection', err);
    throw err;
}
}

async function main() {
    const connection = await createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
      });


try {
    await keys(connection);
} catch (err) {
    console.error('Error KEYS connection', err);
    process.exit(0);
} finally {
    // process.exit(1);
    connection.end();
}
}
main();







// import { createConnection } from 'mysql2/promise';
// const connection = await createConnection({
//   host: 'localhost',
//   user: 'hyfuser',
//   password: 'hyfpassword',
// });


// const create_database_query = `CREATE DATABASE authors`;
// const use_database_query = `USE authors`;

// const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
// const create_table_authors_query = `CREATE TABLE IF NOT EXISTS authors(
//   author_id INT AUTO_INCREMENT PRIMARY KEY,
//   author_name VARCHAR(255) NOT NULL,
//   university VARCHAR(255),
//   date_of_birth DATE,
//   h_index INT(100),
//   gender VARCHAR(100)
// )`;

// // const drop_table_author_mentor_query = `DROP TABLE IF EXISTS author_mentor`;
// // const create_table_author_mentor_query = `CREATE TABLE author_mentor(
// //     author_id INT NOT NULL,
// //     mentor_id INT NOT NULL,
// //     PRIMARY KEY (author_id, mentor_id),
// //     FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
// //     FOREIGN KEY (mentor_id) REFERENCES authors(author_id) ON DELETE CASCADE)
// // `;

// // async function check_column_exists_query (connection) {
// // const [results, fields] = await connection.query(`SHOW COLUMNS FROM authors LIKE 'mentor_id'`);
// // console.log('column exists', results);
// // if (results.length === 0) {
// //     const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
// //     ADD FOREIGN KEY (mentor_id) REFERENCES authors(author_id) ON DELETE CASCADE`;
// //     const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
// //     ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
// //     ON DELETE CASCADE`;
// //     await connection.query(add_column_mentor_query);
// // }
// // }

// const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
// ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
//     ON DELETE CASCADE`;

// // export async function keys() {
// try {
//     await connection.query(create_database_query);
//     await connection.query(use_database_query);
//     // await connection.query(drop_table_author_mentor_query);
//     await connection.query(drop_table_authors_query);
//     await connection.query(create_table_authors_query);
//     // await connection.query(create_table_author_mentor_query);

//     await connection.query(add_column_mentor_query);
//     // await check_column_exists_query(connection);
// } catch (err) {
//     console.error('Error connection', err);
// } finally {
//     await connection.end();
// }


