using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;
using ThreeIT.SYM.Business;

namespace ThreeIT.SYM.WebApi.Controllers
{
    public class UnidadeController : ApiController
    {
        //
        // GET: /Unidade/

        public IEnumerable<string> Index()
        {
            return new string[] { };
        }

        public List<Unidade> GET()
        {
            List<Unidade> ListaUnidades = new List<Unidade>();

            ListaUnidades = new UnidadeBS().ListarUnidades();

            return ListaUnidades;
        }

        

    }
}
