drop PROCEDURE createTask;
CREATE PROCEDURE createTask
  @title NVARCHAR(50),
  @type NVARCHAR(50),
  @description NVARCHAR(1000),
  @userId INT,
  @state NVARCHAR(20),
  @projectId INT
  AS
    IF ((SELECT count(*) FROM tasks WHERE title = @title AND @projectId = project_id) > 0)
        RETURN 0;
    ELSE
    INSERT INTO tasks(title, type, description, project_id, user_id, state, create_date)
        VALUES (@title, @type, @description, @projectId, @userId, @state, CURRENT_TIMESTAMP)
    RETURN 1;

DECLARE @status INT;
EXEC @status = createTask @title = 'task3', @type = 'bug', @description = 'desc', @userId = 1, @state = 'open', @projectId = 1;
SELECT @status ;

SELECT * FROM tasks
SELECT * FROM projects



