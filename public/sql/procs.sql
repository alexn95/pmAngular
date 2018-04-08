CREATE PROCEDURE leaveProject
  @userId INT,
  @projectId INT
  AS
  DELETE FROM users_projects WHERE users_projects.user_id = @userId AND users_projects.project_id = @projectId;

  EXEC leaveProject @userId = 1, @projectId = 1

CREATE PROCEDURE joinProject
  @userId INT,
  @projectId INT
  AS
  INSERT INTO users_projects(user_id, project_id, role) VALUES (@userId, @projectId, 2);

CREATE PROCEDURE deleteProject
  @projectId INT
  AS
  DELETE FROM projects WHERE id = @projectId;


CREATE PROCEDURE deleteTask
  @taskId INT
  AS
  DELETE FROM tasks WHERE id = @taskId;

CREATE PROCEDURE takeTask
  @userId INT,
  @taskId INT
  AS
  UPDATE tasks SET user_id = @userId WHERE id = @taskId

CREATE PROCEDURE leaveTask
  @taskId INT
  AS
  UPDATE tasks SET user_id = null WHERE id = @taskId

CREATE FUNCTION getProjectUsers (@projId INT)
  RETURNS TABLE
  RETURN (
    SELECT [users].id, [login] FROM [users]
        LEFT JOIN users_projects  ON users.id = users_projects.user_id
        WHERE users_projects.project_id = @projId
  )

  SELECT * FROM getProjectUsers (1)



