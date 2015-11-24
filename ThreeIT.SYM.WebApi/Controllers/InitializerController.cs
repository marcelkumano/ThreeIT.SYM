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
    public class InitializerController : ApiController
    {
        //
        // GET: /Initializer/

        public string Index()
        {
            return "";
        }

        //
        // GET: /Initializer/InicializarBase
        public string Get()
        {
            using (SYMContext db = new SYMContext())
            {
                var Status = db.StatusReservaSala.Count();
            }

            new UsuarioBS().InicializarUsuario();
            new UnidadeBS().InicializarUnidade();
            new StatusReservaSalaBS().InicializarStatusReservaSala();

            new SalaReuniaoBS().InicializarSalaReuniao();
            new ReservarSalaBS().InicializarReservaSalas();
            return "OK";
        }

    }
}
