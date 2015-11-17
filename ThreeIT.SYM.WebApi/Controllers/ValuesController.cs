using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;


namespace ThreeIT.SYM.WebApi.Controllers
{
    public class ValuesController : ApiController
    {
        private SYMContext db = new SYMContext();

        // GET api/values
        public IEnumerable<string> Get()
        {
            var Status = db.StatusReservaSala.Count();

            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}