using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;
using ThreeIT.SYM.Business;
using ThreeIT.SYM.WebApi.Models;
using System.Globalization;

namespace ThreeIT.SYM.WebApi.Controllers
{

    public class DisponibilidadeSalaController : ApiController
    {
        //
        // GET: /Api/DisponibilidadeSala/
        public string Get(int? CodigoSalaReuniao, DateTime? DataHoraInicial, DateTime? DataHoraFinal)
        {
            if (CodigoSalaReuniao == null ||
                DataHoraInicial == null ||
                DataHoraFinal == null)
            {
                HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.BadRequest);
                message.Content = new StringContent("Um ou mais parâmetros de entrada estão inválidos.");
                throw new HttpResponseException(message);
            }

            ReservaSala reserva = new ReservaSala();
            reserva.CodigoSalaReuniao = CodigoSalaReuniao.Value;
            reserva.DataHoraInicial = DataHoraInicial.Value;
            reserva.DataHoraFinal = DataHoraFinal.Value;

            if (new ReservarSalaBS().ValidarReservaExistente(reserva))
            {
                HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.Conflict);
                message.Content = new StringContent("A sala não está disponível na data solicitada.");
                throw new HttpResponseException(message);
            }

            return "OK";
        }
    }
}
