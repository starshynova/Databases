const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser', 
    password: 'hyfpassword', 
    database: 'meetup'
});

connection.connect((err) => {
    if (err) {
        console.error('Connection error', err);
        return;
    }
    console.log('Connection to the database was successful');
});

const insertInvitee = `INSERT INTO Invitee (invitee_name, invited_by) VALUES 
    ('Kate', 'John'),
    ('Kris', 'Sara'),
    ('Michael', 'John'),
    ('Dimitri', 'John'),
    ('Maria', 'Sara')`;

const insertRoom = `INSERT INTO Room (room_no, room_name, floor_number) VALUES
    (104, 'Blue room', 1),
    (215, 'Violet room', 2),
    (906, 'Green room', 9),
    (302, 'Orange room', 3),
    (534, 'Blue room', 5)`;

const insertMeeting = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES 
    ('CatchUp', '2024-12-16 11:00:00', '2024-12-16 11:30:00', 906),
    ('Project 1', '2024-12-17 13:00:00', '2024-12-17 14:00:00', 302),
    ('Discussion of the next projects', '2024-12-17 15:00:00', '2024-12-17 18:00:00', 534),
    ('Discussion of new vacancies', '2024-12-18 13:00:00', '2024-12-18 14:00:00', 104),
    ('New hire discussion', '2024-12-18 15:00:00', '2024-12-18 16:00:00', 215)`;


connection.query(insertInvitee, (err) => {
    if (err) {
        console.error('Insert error Invitee', err)
    } else {console.log('Invitee successfully inserted')};

connection.query(insertRoom, (err) => {
    if (err) {
        console.error('Insert error Room', err)
    } else {console.log('Room successfully inserted')};

connection.query(insertMeeting, (err) => {
    if (err) {
        console.error('Insert error Meeting', err)
    } else {console.log('Meeting successfully inserted')};

connection.end();
});
});
});

