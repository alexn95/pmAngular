drop PROCEDURE signup;
CREATE PROCEDURE signup
  @login NVARCHAR(50),
  @password NVARCHAR(50)
  as
    if dbo.isUserExist(@login) = 1
      RETURN 0;
    ELSE
      INSERT INTO [users]([login], [pass]) VALUES (@login, dbo.get_hash(@password))
    RETURN 1;


  DECLARE @status bit;
  EXECUTE @status = signup 'User1', '123123';
  SELECT @status;

SELECT * FROM [users]

DROP FUNCTION isUserExist;
CREATE FUNCTION isUserExist (@login NVARCHAR(50))
  RETURNS bit
  AS
  BEGIN
    DECLARE @count bit;
    SELECT @count = count(*) FROM [users] WHERE [users].login = @login
    RETURN @count;
  END

  SELECT dbo.isUserExist('user1')

DELETE  FROM [users] WHERE id <> 1008 or id <> 1008