drop PROCEDURE editProject;
CREATE PROCEDURE editProject
  @projectId INT,
  @title NVARCHAR(50),
  @description NVARCHAR(200),
  @state NVARCHAR(20)
  AS
    IF (SELECT count(*) FROM projects WHERE title = @title  AND @projectId <> id) > 0
        RETURN 0;
    ELSE
    UPDATE projects
    SET title = @title,  [description] = @description, [state] = @state
    WHERE id = @projectId;
    RETURN 1;

DECLARE @status INT;
EXEC @status = editProject @projectId = 1, @title = 'project2', @description = 'desc', @state = 'open';
SELECT @status status;

SELECT * FROM tasks
SELECT * FROM projects



