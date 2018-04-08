
DROP TABLE [tasks];
DROP TABLE [users_projects]
DROP TABLE [projects]
DROP TABLE [users]

CREATE TABLE [users](
	[id] [int] NOT NULL PRIMARY KEY IDENTITY,
	[login] [nvarchar](50) NOT NULL UNIQUE,
	[pass] [nvarchar](50) NOT NULL,
);

-- CREATE TABLE [states](
-- 	[id] INT NOT NULL PRIMARY KEY IDENTITY ,
-- 	[title] NVARCHAR(20) NOT NULL
-- )


CREATE TABLE [projects](
	[id] [int] NOT NULL PRIMARY KEY IDENTITY,
	[title] [nvarchar](50) NOT NULL UNIQUE,
	[state] [nvarchar](20) NOT NULL,
	[description] [nvarchar](200) NULL,
	[create_date] [datetime] NOT NULL
);



CREATE TABLE [users_projects](
	[id] [int] NOT NULL PRIMARY KEY IDENTITY,
	[user_id] [int] NOT NULL,
	[project_id] [int] NOT NULL,
	[role] [int] NOT NULL,
	CONSTRAINT FK_UP_user FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	CONSTRAINT FK_UP_project FOREIGN KEY (project_id)
    REFERENCES projects (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	CONSTRAINT unique_user_in_project UNIQUE ([user_id], project_id)
);



CREATE TABLE [tasks](
	[id] [int] NOT NULL PRIMARY KEY IDENTITY,
	[title] [nvarchar](50) NOT NULL,
	[type] [nvarchar](20) NULL,
	[description] [nvarchar](1000) NULL,
	[project_id] [int] NOT NULL,
	[user_id] [int] NULL,
	[state] [nvarchar](20) NOT NULL,
	[create_date] [datetime] NULL
	CONSTRAINT FK_TASK_user FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
	CONSTRAINT FK_TASK_project FOREIGN KEY (project_id)
    REFERENCES projects (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	CONSTRAINT unique_task_in_project UNIQUE (title, project_id)
);

