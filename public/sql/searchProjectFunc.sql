DROP FUNCTION searchUserProjects
CREATE FUNCTION searchUserProjects (@title NVARCHAR(50), @userId INT, @onlyUserProjects NVARCHAR(15), @ofset INT, @count INT)
  RETURNS @result TABLE(
    id INT,
    title NVARCHAR(50),
    description NVARCHAR(200),
    project_state NVARCHAR(20),
    create_date DATE,
    user_role INT
  )
  AS
  BEGIN
    IF @onlyUserProjects = 'true'
        INSERT @result SELECT projects.id, projects.title, description, [state] as project_state, create_date, users_projects.role user_role
          FROM projects
        LEFT JOIN users_projects ON projects.id = users_projects.project_id AND @userId = users_projects.user_id
          WHERE projects.title LIKE '%' + @title + '%' AND users_projects.role IS NOT NULL
          ORDER BY projects.create_date DESC, projects.id OFFSET @ofset ROW FETCH NEXT @count ROWS ONLY
    ELSE
        INSERT @result SELECT projects.id, projects.title, description, [state] as project_state, create_date, users_projects.role user_role
          FROM projects
        LEFT JOIN users_projects ON projects.id = users_projects.project_id AND @userId = users_projects.user_id
          WHERE projects.title LIKE '%' + @title + '%'
          ORDER BY projects.create_date DESC, projects.id  OFFSET @ofset ROW FETCH NEXT @count ROWS ONLY
  RETURN
  END

  SELECT * FROM searchUserProjects('', 2, 'false', 0, 10)

SELECT * FROM users
