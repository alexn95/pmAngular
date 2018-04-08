drop PROCEDURE login;
CREATE PROCEDURE login
  @login NVARCHAR(50),
  @password NVARCHAR(50),
  @id int OUTPUT,
  @status bit OUTPUT
  AS
    SELECT @id = [users].id FROM [users] WHERE [users].login = @login
      AND [users].pass = dbo.get_hash(@password);
    if @id is NULL
        set @status = 0
    ELSE
        set @status = 1
  RETURN


DROP FUNCTION auth;
CREATE FUNCTION auth (@login NVARCHAR(50), @password NVARCHAR(50))
  RETURNS INT AS
  BEGIN
    RETURN (SELECT id FROM [users] WHERE [users].login = @login AND [users].pass = dbo.get_hash(@password));
  END

  SELECT * FROM [users];

  DECLARE @id int, @status bit;
  EXECUTE login 'user1', '123',
              @id = @id OUTPUT,
              @status = @status OUTPUT;
  SELECT @id, @status;

  select dbo.auth('user1', '123')




