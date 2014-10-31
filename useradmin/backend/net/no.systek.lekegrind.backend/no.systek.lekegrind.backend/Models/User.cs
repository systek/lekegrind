    using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace no.systek.lekegrind.backend.Models
{
    public class User
    {
        [XmlIgnore]
        public ObjectId _id { get; set; }

        public int pid { get; set;}
        public string firstName { get; set;}
        public string lastName { get; set;}
        public Address address { get; set;}
        public string email { get; set; }
        public string ipAddress { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string ssn { get; set; }
        public string language { get; set; }
        public string regDate { get; set; }
        public Location location { get; set;}
    }
}