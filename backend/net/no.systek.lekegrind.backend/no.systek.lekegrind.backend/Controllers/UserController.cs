using no.systek.lekegrind.backend.Models;
using no.systek.lekegrind.backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace no.systek.lekegrind.backend.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private static readonly IUserRepository _users = new UserRepository(null, "lekegrind");

        //private IUserRepository _users = null;
        //public UserController(IUserRepository rep)
        //{
        //    this._users = rep;
        //}

        // GET: api/User
        public IEnumerable<User> Get()
        {
            return _users.GetAllContacts();
        }

        // GET: api/User/e-mail
        public User Get(int id)
        {
            return _users.GetUser(id);
        }

        // POST: api/User
        public void Post([FromBody]User value)
        {
            _users.AddUser(value);
        }

        // PUT: api/User/e-mail
        public void Put(int id, [FromBody]User value)
        {
            _users.UpdateUser(id, value);
        }

        // DELETE: api/User/e-mail
        public void Delete(int id)
        {
            _users.RemoveUser(id);
        }
    }
}
