CREATE FUNCTION searchUserProjectTasks (@title NVARCHAR(50), @state NVARCHAR(15), @onlyYourTask NVARCHAR(10), @userId INT, @projectId INT,
                                      @ofset INT, @count INT)
  RETURNS @result TABLE(
    id INT,
    title NVARCHAR(50),
    description NVARCHAR(50),
    task_state NVARCHAR(15),
    create_date DATE,
    type NVARCHAR(50),
    project_title NVARCHAR(50),
    project_id INT,
    login NVARCHAR(50),
    user_id INT,
    user_role INT
  )
  AS
  BEGIN
    IF @onlyYourTask = 'true'
        INSERT @result SELECT tasks.id, tasks.title, tasks.description, tasks.state as task_state, tasks.create_date, tasks.type,
        projects.title as project_title, tasks.project_id, users.login, tasks.user_id, users_projects.role user_role FROM tasks
                  LEFT JOIN projects  ON tasks.project_id = projects.id
                  LEFT JOIN users  ON tasks.user_id = users.id
                  LEFT JOIN users_projects ON projects.id = users_projects.project_id AND users_projects.user_id = @userId
                  WHERE tasks.title LIKE '%' + @title + '%'
                        AND tasks.state LIKE '%' + @state + '%'
                        AND tasks.project_id = @projectId
                        AND tasks.user_id = @userId
                  ORDER BY tasks.create_date DESC, tasks.id OFFSET @ofset ROW FETCH NEXT @count ROWS ONLY;
      ELSE
        INSERT @result SELECT tasks.id, tasks.title, tasks.description, tasks.state as task_state, tasks.create_date, tasks.type,
        projects.title as project_title, tasks.project_id, users.login, tasks.user_id, users_projects.role user_role FROM tasks
                  LEFT JOIN projects  ON tasks.project_id = projects.id
                  LEFT JOIN users  ON tasks.user_id = users.id
                  LEFT JOIN users_projects ON projects.id = users_projects.project_id AND users_projects.user_id = @userId
                  WHERE tasks.title LIKE '%' + @title + '%'
                        AND tasks.state LIKE '%' + @state + '%'
                        AND tasks.project_id = @projectId
                  ORDER BY tasks.create_date DESC, tasks.id OFFSET @ofset ROW FETCH NEXT @count ROWS ONLY;
    RETURN
  END

  SELECT * FROM searchUserProjectTasks('', '', 'false', 1, 1, 0, 10)


