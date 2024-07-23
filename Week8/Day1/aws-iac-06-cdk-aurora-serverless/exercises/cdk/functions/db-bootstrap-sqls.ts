// drop tables in reverse order if there are dependencies
export const sql00_dropAllTables = `
    DROP TABLE IF EXISTS
        tickets,
        users,
        gigs
        CASCADE;
`

// NOTE: we should use a TIMESTAMP for date_time but have simplified this for this session
export const sql01_createGigsTable = `
    CREATE TABLE IF NOT EXISTS gigs (
        id SERIAL PRIMARY KEY,
        location VARCHAR(50) NOT NULL,
        artist VARCHAR(50) NOT NULL,
        date_time VARCHAR(50) NOT NULL
    );
`

// "user_name" as "name" is a keyword
export const sql02_createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL,
        user_address VARCHAR(50) NOT NULL
    );
`

export const sql03_createTicketsTable = `
    CREATE TABLE IF NOT EXISTS tickets (
        gig_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_users_id
            FOREIGN KEY (user_id)
            REFERENCES users (id),
        CONSTRAINT fk_gigs_id
            FOREIGN KEY (gig_id)
            REFERENCES gigs (id),
        PRIMARY KEY (gig_id, user_id)
    );
`

export const sql04_populateGigsTable = `
    INSERT INTO gigs
        (location, artist, date_time) 
    VALUES 
        ('The Wardrobe - Leeds', 'Duran Duran', '2022-11-21 19:30:00'),
        ('Victoria Warehouse - Manchester', 'Duran Duran', '2022-11-22 19:45:00'),
        ('The O2 - London', 'Duran Duran', '2022-11-23 20:00:00'),
        ('The Voodoo Rooms - Edinburgh', 'Duran Duran', '2022-11-24 20:15:00'),
        ('The Wardrobe - Leeds', 'Fatboy Slim', '2022-12-16 21:00:00'),
        ('Victoria Warehouse - Manchester', 'Fatboy Slim', '2022-12-17 20:30:00'),
        ('The O2 - London', 'Fatboy Slim', '2022-12-18 20:00:00'),
        ('The Voodoo Rooms - Edinburgh', 'Fatboy Slim', '2022-12-19 19:30:00');
`

export const sql05_populateUsersTable = `
    INSERT INTO users (user_name, user_address)
        VALUES 
            ('Mark', 'Leeds LS11'),
            ('Linzi', 'Leeds LS22'),
            ('Nicole', 'Leeds LS33'),
            ('Rich', 'York YK01'),
            ('Sara', 'Edinburgh EDN09'),
            ('Zoe', 'London SE12');
`

export const sql06_populateTicketsTable = `
    INSERT INTO tickets (gig_id, user_id)
        VALUES 
            (1, 6),
            (2, 5),
            (3, 4),
            (4, 3),
            (5, 2),
            (6, 1),
            (7, 6),
            (8, 5),
            (7, 4),
            (8, 2);
`
