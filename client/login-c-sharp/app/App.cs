using System;
using System.Collections.Generic;

namespace login_c_sharp.Models
{
  class App
  {
    Dictionary<string, User> Users { get; set; }
    bool LoggedIn { get; set; }

    public void Run()
    {
      Console.WriteLine("Welcome");
      while (!LoggedIn)
      {
        System.Console.Write("Username: ");
        string name = Console.ReadLine();
        System.Console.Write("Password: ");
        string pass = Console.ReadLine();
        LoggedIn = Login(name, pass);
        if (LoggedIn) { continue; }
        Console.Clear();
        System.Console.WriteLine("Invalid Login");
      }
      System.Console.WriteLine("Successfully Logged In!");
    }

    private bool Login(string name, string pass)
    {
      return Users.ContainsKey(name) && Users[name].ValidatePassword(pass);
    }

    public App()
    {
      Users = new Dictionary<string, User>();
      User mark = new User("Mark", "IheartC0de");
      User jake = new User("Jake", "MarkIsTheeBest");
      Users.Add(mark.Name, mark);
      Users.Add(jake.Name, jake);
    }
  }
}