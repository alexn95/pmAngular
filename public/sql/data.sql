select * from users;

INSERT INTO users([login],  pass) VALUES('user1', dbo.get_hash('123'));
INSERT INTO users([login], pass) VALUES('user2',  dbo.get_hash('123'));


SELECT [users].id, [login] FROM [users]
  LEFT JOIN users_projects  ON users.id = users_projects.user_id
  WHERE users_projects.project_id = 4

select * from projects;
delete from projects;

INSERT INTO projects(title, [state], [description], create_date) VALUES('project1', 'open', 'some desc', CURRENT_TIMESTAMP);
INSERT INTO projects(title, [state], [description], create_date) VALUES('project2', 'open', 'some desc', CURRENT_TIMESTAMP);

select * from tasks;
delete from tasks;

INSERT INTO tasks(title, [state], [type], [description], project_id, user_id, [create_date])
        VALUES('task1', 'open', 'bug', 'some desc', 1, 1, CURRENT_TIMESTAMP);
INSERT INTO tasks(title, [state], [type], [description], project_id, user_id, [create_date])
        VALUES('task2', 'open', 'bug', 'some desc', 1, null, CURRENT_TIMESTAMP);
INSERT INTO tasks(title, [state], [type], [description], project_id, user_id, [create_date])
        VALUES('task1', 'open', 'bug', 'some desc', 2, 1, CURRENT_TIMESTAMP);
INSERT INTO tasks(title, [state], [type], [description], project_id, user_id, [create_date])
        VALUES('task2', 'open', 'bug', 'some desc', 2, null, CURRENT_TIMESTAMP);

select * from users_projects;
INSERT INTO users_projects([user_id], project_id, [role]) VALUES(1, 1, 0);
INSERT INTO users_projects([user_id], project_id, [role]) VALUES(1, 2, 0);
INSERT INTO users_projects([user_id], project_id, [role]) VALUES(2, 1, 0);
INSERT INTO users_projects([user_id], project_id, [role]) VALUES(2, 2, 0);


INSERT INTO [states](title) VALUES ('open'),('complete'),('in progress'),('to verify'), ('close');
SELECT * FROM states
DELETE FROM states WHERE id = 3