CREATE VIEW subject_average AS
SELECT
    s.id AS id,
    s.name AS subject,
    NULLIF(SUM(g.grade * g.weight) / NULLIF(SUM(g.weight), 0),0) AS average
FROM 
    subjects s
LEFT JOIN 
    grades g ON s.id = g.subject
GROUP BY 
    s.id, s.name;
