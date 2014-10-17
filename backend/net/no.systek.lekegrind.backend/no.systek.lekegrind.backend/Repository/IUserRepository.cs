using no.systek.lekegrind.backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace no.systek.lekegrind.backend.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllContacts();

        User GetUser(int id);

        User AddUser(User item);

        bool RemoveUser(int id);

        bool UpdateUser(int id, User item);

        bool RemoveAll();
    }
}