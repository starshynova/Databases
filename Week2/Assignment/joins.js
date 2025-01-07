import { createConnection } from 'mysql2/promise';
import { relationships } from './Relationships.js';

async function joins() {
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const author_mentor_query = `SELECT authors.author_name, authors.mentor_name FROM authors`;
const author_paper_query = `SELECT authors.author_name, research_papers.paper_title FROM authors 
    LEFT JOIN author_paper ON authors.author_id = author_paper.author_id 
    LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id`;

try {
await relationships(connection);
const [result_author_mentor_query] = await connection.query(author_mentor_query);
console.log(result_author_mentor_query);
const [result_author_paper_query] = await connection.query(author_paper_query);
console.log(result_author_paper_query);
} catch (err) {
    console.error('Error connection', err);
 } finally {
    await connection.end();
}
}

joins()
    .then(() => process.exit(0)) 
    .catch((err) => {
        console.error('Unexpected error:', err);
        process.exit(1); 
    });




