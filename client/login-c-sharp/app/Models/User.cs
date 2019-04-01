namespace login_c_sharp.Models
{
  class User
  {
    public string Name { get; set; }
    string Password { get; set; }

    public bool ValidatePassword(string creds)
    {
      return creds == Password;
    }

    public User(string name, string pass)
    {
      Password = pass;
      Name = name;
    }
  }
}