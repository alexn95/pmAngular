drop FUNCTION get_hash;
CREATE FUNCTION get_hash (@pass nvarchar(50))
RETURNS  nvarchar(50)
AS
BEGIN
     RETURN (SELECT HASHBYTES('SHA1', @pass));
END


-- UPDATE [users]
-- SET pass = HASHBYTES('SHA1',[users].pass)