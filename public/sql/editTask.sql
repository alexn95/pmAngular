drop PROCEDURE editTask;
CREATE PROCEDURE editTask
  @taskId INT,
  @title NVARCHAR(50),
  @type NVARCHAR(50),
  @description NVARCHAR(1000),
  @userId INT,
  @state NVARCHAR(20),
  @projectId INT
  AS
    IF ((SELECT count(*) FROM tasks WHERE title = @title AND @taskId <> id
          AND @projectId = project_id) > 0)
        RETURN 0;
    ELSE
    UPDATE tasks
    SET title = @title, [type] = @type, [description] = @description, [state] = @state, user_id = @userId
    WHERE id = @taskId;
    RETURN 1;

DECLARE @status INT;
EXEC @status = editTask @taskId = 1, @title = 'task1', @type = 'bug', @description = 'desc', @userId = 1, @state = 'open', @projectId = 1;
SELECT @status ;

SELECT * FROM tasks
SELECT * FROM projects



