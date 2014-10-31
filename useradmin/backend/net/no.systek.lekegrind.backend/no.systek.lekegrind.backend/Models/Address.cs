    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace no.systek.lekegrind.backend.Models
{
    public class Address
    {
        public string street { get; set; }
        public string zip { get; set; }
        public string city { get; set; }
        public string country { get; set; }
    }
}