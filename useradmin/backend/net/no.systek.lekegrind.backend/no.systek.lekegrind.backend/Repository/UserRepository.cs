using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using no.systek.lekegrind.backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace no.systek.lekegrind.backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private MongoServer _server;
        private MongoDatabase _database;
        private MongoCollection<User> _users;

        public UserRepository(string connection, string database)
        {
            if (string.IsNullOrWhiteSpace(connection))
            {
                connection = "mongodb://localhost:27017";
            }

            MongoClient client = new MongoClient(connection);
            _server = client.GetServer();
            _database = _server.GetDatabase(database);
            _users = _database.GetCollection<User>("Users");
        }

        public IEnumerable<Models.User> GetAllContacts()
        {
            return _users.FindAll().ToList();
        }

        public User GetUser(int id)
        {
            var user = (from u in _users.AsQueryable<User>()
                        where u.pid == id
                        select u);

            try
            {
                return user.FirstOrDefault();
            }
            catch (MongoCommandException e)
            {
                return null;
            }
        }

        public Models.User AddUser(Models.User item)
        {
            var res = _users.Insert(item);

            return item;
        }

        public bool RemoveUser(int id)
        {
            var res = _users.Remove(Query.EQ("pid", id));

            return res.DocumentsAffected == 1;
        }

        public bool UpdateUser(int id, Models.User item)
        {
            var query = Query.EQ("pid",id);

           IMongoUpdate update = Update
             .Set("firstName", item.firstName)
             .Set("lastName", item.lastName)
             .Set("email", item.email)
             .Set("ipAddress", item.ipAddress)
             .Set("username", item.username)
             .Set("password", item.password)
             .Set("ssn", item.ssn)
             .Set("language", item.language)
             .Set("regDate", item.regDate);

           var status = _users.Update(query, update);

           return status.UpdatedExisting;
        }

        public bool RemoveAll()
        {
            return _users.RemoveAll().DocumentsAffected == 1;
        }
    }
}