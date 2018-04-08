drop PROCEDURE searchTasks;
CREATE PROCEDURE searchTasks
  @projectId INT,
  @title NVARCHAR(50),
  @state NVARCHAR(15),
  @userId INT,
  @onlyYourTask NVARCHAR(10),
  @ofset INT,
  @count INT
  AS
  IF @projectId = -1
    SELECT * FROM searchUserTasks(@title, @state, @onlyYourTask, @userId, @ofset, @count)
  ELSE
    SELECT * FROM searchUserProjectTasks (@title, @state, @onlyYourTask, @userId, @projectId, @ofset, @count)

    RETURN;


EXEC searchTasks @projectId = '1',  @title = '', @state = '', @userId = 1, @onlyYourTask = 'true', @ofset = 0, @count = 10

SELECT * FROM tasks
SELECT * FROM projects
SELECT * FROM users



