SELECT projects.id, projects.title, [state] as project_state, description, create_date  FROM projects


SELECT tasks.id, tasks.title, tasks.description, tasks.state as task_state, tasks.create_date,
        tasks.type, projects.title as project_title, tasks.project_id, users.login, tasks.user_id FROM tasks
        LEFT JOIN projects  ON tasks.project_id = projects.id
        LEFT JOIN users  ON tasks.user_id = users.id;