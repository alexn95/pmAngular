drop PROCEDURE createProject;
CREATE PROCEDURE createProject
  @title NVARCHAR(50),
  @description NVARCHAR(200),
  @userId INT
  AS
    DECLARE @id INT;
    IF (SELECT count(*) FROM projects WHERE title = @title) > 0
        RETURN 0;
    ELSE
    INSERT INTO projects(title, state, description, create_date)
        VALUES (@title, 'open', @description, CURRENT_TIMESTAMP)
    SELECT @id = id FROM projects WHERE title = @title
    INSERT INTO users_projects(user_id, project_id, role)
        VALUES (@userId, @id, 1)
    RETURN 1;

DECLARE @status INT;
EXEC @status = createProject  @title = 'projec3', @description = 'desc', @userId = 1;
SELECT @status status;

SELECT * FROM tasks
SELECT * FROM projects



