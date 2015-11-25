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
    public class SalasReservadasController : ApiController
    {
        //
        // GET: /SalasReservadas/

        public SalasAgendadas Get(int QtdPessoas, int IdUnidade, int RangeData)
        {
            //int QtdPessoas = 4;
            //int IdUnidade = 1;
            //int RangeData = 2;

            List<SalaReuniao> ListaSalas = new SalaReuniaoBS().ListarSalas(IdUnidade, QtdPessoas);

            List<ReservaSala> ListaReserva = new ReservarSalaBS().BuscarReservas(ListaSalas, RangeData);
            //var Listagem = new ReservarSalaBS().BuscarReservas(ListaSalas, RangeData);



            SalasAgendadas Agendamento = new SalasAgendadas();

            Agendamento.meses = new List<Meses>();

            Meses _Meses = new Meses();
            _Meses.numeroMes = DateTime.Today.Month;
            _Meses.mes = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Today.Month);
            _Meses.descricaoMes = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Today.Month) + " " + DateTime.Today.Year;

            Agendamento.meses.Add(_Meses);


            Agendamento.meses[0].dias = new List<Dias>();

            Dias _Dias = new Dias();
            _Dias.diaSemana = CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(DateTime.Today.DayOfWeek);
            _Dias.numeroDia = DateTime.Today.Day;
            _Dias.salas = new List<Salas>();

            foreach(SalaReuniao Sala in ListaSalas)
            {
                Salas _Sala = new Salas();
                _Sala.quantidadeLugares = Sala.CapacidadeSala;
                _Sala.nomeSala = Sala.NomeSala;
                _Sala.horarioInicial = Sala.DisponibilidadeInicio;
                _Sala.horarioFinal = Sala.DispoonibilidadeFim;

                _Sala.reservas = new List<Reservas>();
                foreach(ReservaSala Reserva in ListaReserva.Where(p => p.CodigoUsuario == Sala.CodigoSalaReuniao))
                {
                    Reservas _Reserva = new Reservas();
                    _Reserva.horarioFinal = Reserva.DataHoraFinal;
                    _Reserva.horarioInicial = Reserva.DataHoraInicial;
                    _Reserva.idAgendamento = Reserva.CodigoReserva;
                    _Reserva.reservadoPara = "";

                    _Sala.reservas.Add(_Reserva);
                }

                _Dias.salas.Add(_Sala);
            }
            Agendamento.meses[0].dias.Add(_Dias);


            return Agendamento;
        }
    }
}
