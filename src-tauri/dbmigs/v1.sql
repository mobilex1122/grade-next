CREATE TABLE subjects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE grades (
    id INTEGER PRIMARY KEY,
    name TEXT,
    grade REAL NOT NULL,
    weight REAL DEFAULT 1.0,
    subject INTEGER,
    FOREIGN KEY (subject) REFERENCES subjects(id) ON DELETE CASCADE
);
