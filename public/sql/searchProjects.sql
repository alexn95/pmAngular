drop PROCEDURE searchProjects;
CREATE PROCEDURE searchProjects
  @onlyUserProjects VARCHAR(10),
  @title NVARCHAR(50),
  @userId INT,
  @ofset INT,
  @count INT
  AS
    SELECT * FROM searchUserProjects(@title, @userId, @onlyUserProjects, @ofset, @count)
    RETURN;

EXEC searchProjects @onlyUserProjects = 'true', @title = '', @userId = 1, @ofset = 0, @count = 10

  SELECT * FROM users_projects;
  SELECT * FROM tasks;

SELECT * FROM projects ORDER BY id OFFSET 1 ROW Fetch Next 1 Rows Only
