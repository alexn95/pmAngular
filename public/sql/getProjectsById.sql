DROP FUNCTION getProjectById
CREATE FUNCTION getProjectById (@id INT)
  RETURNS TABLE
  RETURN (
      SELECT projects.id, projects.title, [state] as project_state, description, create_date  FROM projects
                WHERE projects.id = @id
  )


SELECT * FROM getProjectById (2)
