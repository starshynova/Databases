import { createConnection } from 'mysql2/promise';
import { keys } from './keys.js';

const use_database_query = `USE test`;
// const connection = await createConnection({
//   host: 'localhost',
//   user: 'hyfuser',
//   password: 'hyfpassword',
//   database: 'test',
// });

// const create_database_query = `CREATE DATABASE IF NOT EXISTS papers`;
// const use_database_query = `USE papers`;

// const drop_foreign_key_authors_query = `ALTER TABLE authors DROP FOREIGN KEY authors_ibfk_1`;
// const drop_column_mentor_query = `ALTER TABLE authors DROP COLUMN mentor_id`;
// const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
// const drop_table_author_mentor_query = `DROP TABLE IF EXISTS author_mentor`;
const drop_table_research_papers_query = `DROP TABLE IF EXISTS research_papers`;
const drop_table_author_paper_query = `DROP TABLE IF EXISTS author_paper`;

// const create_table_authors_query = `CREATE TABLE authors(
//     author_id INT AUTO_INCREMENT PRIMARY KEY,
//     author_name VARCHAR(255) NOT NULL,
//     university VARCHAR(255),
//     date_of_birth DATE,
//     h_index INT(100),
//     gender VARCHAR(100)
//   )`;
  

// const create_table_author_mentor_query = `CREATE TABLE author_mentor(
//     author_id INT NOT NULL,
//     mentor_id INT NOT NULL,
//     PRIMARY KEY (author_id, mentor_id),
//     FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
//     FOREIGN KEY (mentor_id) REFERENCES authors(author_id) ON DELETE CASCADE)
// `;

// const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
//     ADD FOREIGN KEY (mentor_id) REFERENCES author_mentor(mentor_id) ON DELETE CASCADE`;

const create_table_research_papers_query = `CREATE TABLE IF NOT EXISTS research_papers(
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255) NOT NULL,
  conference VARCHAR(255),
  publish_date DATE
)`;

const create_table_author_paper_query = `CREATE TABLE IF NOT EXISTS author_paper(
    author_id INT,
    paper_id INT,
    UNIQUE KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
    )`;

const insert_authors_query = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES 
    ('John Doe', 'Harvard', '1980-05-15', 35, 'Male'),
    ('Jane Smith', 'Stanford', '1985-03-10', 42, 'Female'),
    ('Alice Green', 'MIT', '1990-07-22', 28, 'Female'),
    ('Michael Brown', 'Cambridge', '1975-11-30', 50, 'Male'),
    ('Emily White', 'Harvard', '1982-04-05', 18, 'Female'),
    ('Robert Black', 'Oxford', '1983-08-19', 40, 'Male'),
    ('Sophia Johnson', 'Stanford', '1989-01-25', 30, 'Female'),
    ('Daniel Martinez', 'MIT', '1982-03-17', 37, 'Male'),
    ('Olivia Brown', 'Cambridge', '1975-12-14', 15, 'Female'),
    ('James Wilson', 'Oxford', '1987-07-10', 25, 'Male'),
    ('Isabella Clark', 'Harvard', '1984-09-23', 22, 'Female'),
    ('Liam Walker', 'Stanford', '1990-06-18', 33, 'Male'),
    ('Mia Hall', 'Cambridge', '1986-02-11', 38, 'Female'),
    ('Noah Lee', 'MIT', '1973-11-08', 20, 'Male'),
    ('Amelia Young', 'Oxford', '1981-05-21', 45, 'Female')`;  

const insert_mentor_id_query = `
    CREATE TEMPORARY TABLE temp_author_mentor (author_name VARCHAR(255), mentor_name VARCHAR(255));
    INSERT INTO temp_author_mentor (author_name, mentor_name) VALUES
    ('John Doe', 'Alice Green');

    UPDATE authors AS a1
    JOIN temp_author_mentor AS tam ON a1.author_name = t.author_name
    JOIN authors AS a2 ON a2.author_name = tam.mentor_name
    SET a1.mentor_id = a2.author_id;`;
    
    
    // ((SELECT author_id FROM authors WHERE author_name = 'Jane Smith'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Olivia Brown')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Alice Green'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Olivia Brown')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Michael Brown'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Jane Smith')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Robert Black'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'John Doe')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Noah Lee')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Jane Smith')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Olivia Brown'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Alice Green')),

    // ((SELECT author_id FROM authors WHERE author_name = 'James Wilson'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Noah Lee')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Isabella Clark'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'John Doe')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Mia Hall'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Noah Lee'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson')),

    // ((SELECT author_id FROM authors WHERE author_name = 'Amelia Young'), 
    //  (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'))


// const update_mentor_column_in_authors_query = `UPDATE authors SET mentor_id = 
//     (SELECT mentor_id FROM author_mentor WHERE author_id = authors.author_id)`;

// const add_column_mentor_name_query = `ALTER TABLE authors ADD COLUMN mentor_name VARCHAR(255)`; 

// const update_mentor_name_in_authors_query = `UPDATE authors AS a
//     LEFT JOIN author_mentor AS a_m ON a.author_id = a_m.author_id
//     LEFT JOIN authors AS m ON a_m.mentor_id = m.author_id
//     SET a.mentor_name = m.author_name`;

// const insert_research_papers_query = `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
//     ('Deep Learning Advances', 'ICML', '2021-09-10'),
//     ('Quantum Computing Innovations', 'IEEE', '2020-07-15'),
//     ('Blockchain for Supply Chains', 'ACM', '2019-05-20'),
//     ('Neural Networks in Medicine', 'NeurIPS', '2022-10-01'),
//     ('Climate Change Modeling', 'IPCC', '2018-03-12'),
//     ('Advances in Robotics', 'ICRA', '2017-11-28'),
//     ('Ethical AI', 'AAAI', '2021-02-19'),
//     ('Renewable Energy Innovations', 'SEIA', '2020-06-15'),
//     ('Big Data Analytics', 'VLDB', '2016-12-01'),
//     ('Genetic Algorithms in Biology', 'ACM BCB', '2023-08-07'),
//     ('Virtual Reality in Education', 'EdMedia', '2022-04-11'),
//     ('Human-Computer Interaction Design', 'CHI', '2015-09-15'),
//     ('Space Exploration and AI', 'NASA Tech', '2024-01-20'),
//     ('Cybersecurity in IoT', 'Black Hat', '2021-07-25'),
//     ('Machine Learning in Healthcare', 'ISBI', '2019-05-10'),
//     ('Urban Planning with GIS', 'GIScience', '2018-11-03'),
//     ('Advances in Cryptography', 'CRYPTO', '2017-06-29'),
//     ('Bioinformatics Tools', 'ISMB', '2020-05-21'),
//     ('Self-Driving Cars', 'CVPR', '2022-12-10'),
//     ('Internet of Things for Smart Cities', 'IoT Tech Expo', '2019-03-22'),
//     ('Augmented Reality Applications', 'IEEE VR', '2023-09-14'),
//     ('Natural Language Processing', 'EMNLP', '2020-04-18'),
//     ('Game Theory in Economics', 'GTO', '2021-11-30'),
//     ('Cancer Research Innovations', 'AACR', '2019-08-13'),
//     ('Wireless Networks Security', 'MobiCom', '2018-10-27'),
//     ('Quantum Machine Learning', 'QML', '2023-06-06'),
//     ('Deep Reinforcement Learning', 'AAAI RL', '2022-01-19'),
//     ('Virtual Labs in Education', 'EDUCAUSE', '2021-02-12'),
//     ('Nanotechnology in Medicine', 'NanoMed', '2020-07-23'),
//     ('Autonomous Drone Navigation', 'IROS', '2018-09-05')
// `;

// const insert_author_paper_query = `INSERT INTO author_paper (author_id, paper_id) VALUES
//     ((SELECT author_id FROM authors WHERE author_name = 'John Doe'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),
//     ((SELECT author_id FROM authors WHERE author_name = 'John Doe'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Quantum Computing Innovations')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Jane Smith'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Blockchain for Supply Chains')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Jane Smith'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Neural Networks in Medicine')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Alice Green'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Climate Change Modeling')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Alice Green'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Advances in Robotics')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Michael Brown'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Ethical AI')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Michael Brown'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Renewable Energy Innovations')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Emily White'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Emily White'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Genetic Algorithms in Biology')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Robert Black'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Neural Networks in Medicine')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Robert Black'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Human-Computer Interaction Design')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Space Exploration and AI')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Cybersecurity in IoT')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Machine Learning in Healthcare')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Olivia Brown'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Advances in Cryptography')),
//     ((SELECT author_id FROM authors WHERE author_name = 'James Wilson'), (SELECT paper_id FROM research_papers WHERE paper_title = 'Bioinformatics Tools')),
//     ((SELECT author_id FROM authors WHERE author_name = 'Isabella Clark '), (SELECT paper_id FROM research_papers WHERE paper_title = 'Self-Driving Cars'))
// `;


export async function relationships(connection) {
try {
    
    await keys(connection);
    await connection.query(use_database_query);
    // await connection.query(create_database_query);
    // await connection.query(use_database_query);
    // await connection.query(drop_foreign_key_authors_query);
    // await connection.query(drop_column_mentor_query);
    await connection.query(drop_table_author_paper_query);
    await connection.query(drop_table_research_papers_query);
    // await connection.query(drop_table_author_mentor_query);
    // await connection.query(drop_table_authors_query);
    // await connection.query(create_table_authors_query);
    // await connection.query(create_table_author_mentor_query);
    // await connection.query(add_column_mentor_query);
    await connection.query(create_table_research_papers_query);
    await connection.query(create_table_author_paper_query);
    await connection.query(insert_authors_query);
    await connection.query(insert_mentor_id_query);
    // await connection.query(insert_author_mentor_query);
    // await connection.query(update_mentor_column_in_authors_query);
    // await connection.query(add_column_mentor_name_query);
    // await connection.query(update_mentor_name_in_authors_query);
    // await connection.query(insert_research_papers_query);
    // await connection.query(insert_author_paper_query);
} catch (err) {
    console.error('Error RELATIONSHIPS inside connection', err);
    // connection.end();
    throw err;
// } finally {
//     await connection.end();
}
}

async function main() {
    const connection = await createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'test',
      });

try {
    await relationships(connection);
    // process.exit(0);
} catch (err) {
    console.error('Error RELATIONSHIPS connection', err);
    process.exit(0);
    // connection.end();
} finally {
    connection.end();
}
}

main();













// import { createConnection } from 'mysql2/promise';

// const use_database_query = `USE authors`;
// const connection = await createConnection({
//   host: 'localhost',
//   user: 'hyfuser',
//   password: 'hyfpassword',
//   database: 'authors',
// });

// const drop_table_research_papers_query = `DROP TABLE IF EXISTS research_papers`;
// const drop_table_author_paper_query = `DROP TABLE IF EXISTS author_paper`;


// const create_table_research_papers_query = `CREATE TABLE IF NOT EXISTS research_papers(
//   paper_id INT AUTO_INCREMENT PRIMARY KEY,
//   paper_title VARCHAR(255) NOT NULL,
//   conference VARCHAR(255),
//   publish_date DATE
// )`;

// const create_table_author_paper_query = `CREATE TABLE IF NOT EXISTS author_paper(
//     author_id INT,
//     paper_id INT,
//     UNIQUE KEY (author_id, paper_id),
//     FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
//     FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
//     )`;

// const insert_authors_query = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES 
//     ('John Doe', 'Harvard', '1980-05-15', 35, 'Male'),
//     ('Jane Smith', 'Stanford', '1985-03-10', 42, 'Female'),
//     ('Alice Green', 'MIT', '1990-07-22', 28, 'Female'),
//     ('Michael Brown', 'Cambridge', '1975-11-30', 50, 'Male'),
//     ('Emily White', 'Harvard', '1982-04-05', 18, 'Female'),
//     ('Robert Black', 'Oxford', '1983-08-19', 40, 'Male'),
//     ('Sophia Johnson', 'Stanford', '1989-01-25', 30, 'Female'),
//     ('Daniel Martinez', 'MIT', '1982-03-17', 37, 'Male'),
//     ('Olivia Brown', 'Cambridge', '1975-12-14', 15, 'Female'),
//     ('James Wilson', 'Oxford', '1987-07-10', 25, 'Male'),
//     ('Isabella Clark', 'Harvard', '1984-09-23', 22, 'Female'),
//     ('Liam Walker', 'Stanford', '1990-06-18', 33, 'Male'),
//     ('Mia Hall', 'Cambridge', '1986-02-11', 38, 'Female'),
//     ('Noah Lee', 'MIT', '1973-11-08', 20, 'Male'),
//     ('Amelia Young', 'Oxford', '1981-05-21', 45, 'Female')`;  

// const create_temp_table_query = `CREATE TEMPORARY TABLE temp_author_mentor (author_id INT, mentor_id INT)`;

// const insert_mentor_id_into_temp_table_query = `

// INSERT INTO temp_author_mentor (author_id, mentor_id)
// SELECT author_id, mentor_id
// FROM (
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'John Doe') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Alice Green') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Jane Smith') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Olivia Brown') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Alice Green') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Olivia Brown') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Michael Brown') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Jane Smith') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Robert Black') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'John Doe') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Noah Lee') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Jane Smith') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Olivia Brown') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Alice Green') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Isabella Clark') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'John Doe') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Mia Hall') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Noah Lee') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Amelia Young') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson') AS mentor_id
//     UNION ALL
//     SELECT 
//         (SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson') AS author_id,
//         (SELECT author_id FROM authors WHERE author_name = 'Mia Hall') AS mentor_id
// ) AS temp_values`;
 
// const update_mentor_id_query = `
// UPDATE authors AS a1
// JOIN temp_author_mentor AS tam ON a1.author_id = tam.author_id
// SET a1.mentor_id = tam.mentor_id;
// `;

// const drop_temp_table_query = `DROP TEMPORARY TABLE temp_author_mentor`;

// const insert_research_papers_query = `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
//     ('Deep Learning Advances', 'ICML', '2021-09-10'),
//     ('Quantum Computing Innovations', 'IEEE', '2020-07-15'),
//     ('Blockchain for Supply Chains', 'ACM', '2019-05-20'),
//     ('Neural Networks in Medicine', 'NeurIPS', '2022-10-01'),
//     ('Climate Change Modeling', 'IPCC', '2018-03-12'),
//     ('Advances in Robotics', 'ICRA', '2017-11-28'),
//     ('Ethical AI', 'AAAI', '2021-02-19'),
//     ('Renewable Energy Innovations', 'SEIA', '2020-06-15'),
//     ('Big Data Analytics', 'VLDB', '2016-12-01'),
//     ('Genetic Algorithms in Biology', 'ACM BCB', '2023-08-07'),
//     ('Virtual Reality in Education', 'EdMedia', '2022-04-11'),
//     ('Human-Computer Interaction Design', 'CHI', '2015-09-15'),
//     ('Space Exploration and AI', 'NASA Tech', '2024-01-20'),
//     ('Cybersecurity in IoT', 'Black Hat', '2021-07-25'),
//     ('Machine Learning in Healthcare', 'ISBI', '2019-05-10'),
//     ('Urban Planning with GIS', 'GIScience', '2018-11-03'),
//     ('Advances in Cryptography', 'CRYPTO', '2017-06-29'),
//     ('Bioinformatics Tools', 'ISMB', '2020-05-21'),
//     ('Self-Driving Cars', 'CVPR', '2022-12-10'),
//     ('Internet of Things for Smart Cities', 'IoT Tech Expo', '2019-03-22'),
//     ('Augmented Reality Applications', 'IEEE VR', '2023-09-14'),
//     ('Natural Language Processing', 'EMNLP', '2020-04-18'),
//     ('Game Theory in Economics', 'GTO', '2021-11-30'),
//     ('Cancer Research Innovations', 'AACR', '2019-08-13'),
//     ('Wireless Networks Security', 'MobiCom', '2018-10-27'),
//     ('Quantum Machine Learning', 'QML', '2023-06-06'),
//     ('Deep Reinforcement Learning', 'AAAI RL', '2022-01-19'),
//     ('Virtual Labs in Education', 'EDUCAUSE', '2021-02-12'),
//     ('Nanotechnology in Medicine', 'NanoMed', '2020-07-23'),
//     ('Autonomous Drone Navigation', 'IROS', '2018-09-05')
// `;

// const insert_author_paper_query = `INSERT INTO author_paper (author_id, paper_id) VALUES
//     ((SELECT author_id FROM authors WHERE author_name = 'John Doe'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),

//     ((SELECT author_id FROM authors WHERE author_name = 'John Doe'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Quantum Computing Innovations')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Jane Smith'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Blockchain for Supply Chains')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Jane Smith'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Neural Networks in Medicine')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Alice Green'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Climate Change Modeling')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Alice Green'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Advances in Robotics')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Michael Brown'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Ethical AI')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Michael Brown'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Renewable Energy Innovations')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Emily White'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Emily White'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Genetic Algorithms in Biology')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Robert Black'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Neural Networks in Medicine')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Robert Black'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Human-Computer Interaction Design')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Space Exploration and AI')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Sophia Johnson'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Cybersecurity in IoT')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Machine Learning in Healthcare')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Daniel Martinez'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Deep Learning Advances')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Olivia Brown'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Advances in Cryptography')),

//     ((SELECT author_id FROM authors WHERE author_name = 'James Wilson'), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Bioinformatics Tools')),

//     ((SELECT author_id FROM authors WHERE author_name = 'Isabella Clark '), 
//     (SELECT paper_id FROM research_papers WHERE paper_title = 'Self-Driving Cars'))
// `;


// try {
//     await connection.query(use_database_query);
//     await connection.query(drop_table_author_paper_query);
//     await connection.query(drop_table_research_papers_query);
//     await connection.query(create_table_research_papers_query);
//     await connection.query(create_table_author_paper_query);
//     await connection.query(insert_authors_query);
//     await connection.query(create_temp_table_query);
//     await connection.query(insert_mentor_id_into_temp_table_query);
//     await connection.query(update_mentor_id_query);
//     await connection.query(drop_temp_table_query);
//     await connection.query(insert_research_papers_query);
//     await connection.query(insert_author_paper_query);
// } catch (err) {
//     console.error('Error connection', err);
// } finally {
//     await connection.end();
// }

