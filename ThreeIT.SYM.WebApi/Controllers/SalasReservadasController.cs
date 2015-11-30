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

            SalasAgendadas Agendamento = new SalasAgendadas();

            Agendamento.meses = new List<Meses>();

            Meses _Meses = new Meses();

            _Meses.ano = DateTime.Now.Year;
            _Meses.numeroMes = DateTime.Today.Month;
            _Meses.mes = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Today.Month);
            _Meses.descricaoMes = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Today.Month) + " " + DateTime.Today.Year;

            Agendamento.meses.Add(_Meses);

            Agendamento.meses[0].dias = new List<Dias>();

            int contadorDias = 0;

            if (RangeData == 1)
            {
                Dias _Dias = new Dias();
                _Dias = PreencherListas(contadorDias, ListaSalas, ListaReserva);
                Agendamento.meses[0].dias.Add(_Dias);
            }
            else if (RangeData == 2)
            {
                for (int i = (int)DateTime.Today.DayOfWeek; i < 6; i++)
                {
                    Dias _Dias = new Dias();

                    _Dias = PreencherListas(contadorDias, ListaSalas, ListaReserva);

                    Agendamento.meses[0].dias.Add(_Dias);
                    contadorDias += 1;
                }
            }
            else if (RangeData == 3)
            {
                for (int i = (int)DateTime.Today.Day; i <= DateTime.DaysInMonth(DateTime.Today.Year, DateTime.Today.Month); i++)
                {
                    if ((int)DateTime.Today.AddDays(contadorDias).DayOfWeek != 6 && (int)DateTime.Today.AddDays(contadorDias).DayOfWeek != 0)
                    {
                        Dias _Dias = new Dias();

                        _Dias = PreencherListas(contadorDias, ListaSalas, ListaReserva);

                        Agendamento.meses[0].dias.Add(_Dias);
                    }
                    contadorDias += 1;
                }
            }

            return Agendamento;
        }

        private Dias PreencherListas(int contadorDias, List<SalaReuniao> ListaSalas, List<ReservaSala> ListaReserva)
        {
            Dias _Dias = new Dias();
            _Dias.diaSemana = CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(DateTime.Today.AddDays(contadorDias).DayOfWeek);
            _Dias.numeroDia = DateTime.Today.AddDays(contadorDias).Day;
            _Dias.salas = new List<Salas>();

            foreach (SalaReuniao Sala in ListaSalas)
            {
                Salas _Sala = new Salas();

                _Sala.codigoUnidade = Sala.CodigoUnidade;
                _Sala.nomeUnidade = new UnidadeBS().DetalharUnidade(Sala.CodigoUnidade).NomeUnidade;
                _Sala.codigoSala = Sala.CodigoSalaReuniao;
                _Sala.nomeSala = Sala.NomeSala;
                _Sala.quantidadeLugares = Sala.CapacidadeSala;
                _Sala.horarioInicial = Sala.DisponibilidadeInicio;
                _Sala.horarioFinal = Sala.DispoonibilidadeFim;

                _Sala.reservas = new List<Reservas>();
                foreach (ReservaSala Reserva in ListaReserva.Where(p => p.CodigoSalaReuniao == Sala.CodigoSalaReuniao))
                {
                    if (Reserva.DataHoraInicial.Day == DateTime.Today.AddDays(contadorDias).Day)
                    {
                        Reservas _Reserva = new Reservas();
                        _Reserva.horarioFinal = Reserva.DataHoraFinal;
                        _Reserva.horarioInicial = Reserva.DataHoraInicial;
                        _Reserva.idAgendamento = Reserva.CodigoReserva;
                        _Reserva.reservadoPara = "";

                        _Sala.reservas.Add(_Reserva);
                    }
                }

                _Dias.salas.Add(_Sala);
            }

            return _Dias;
        }
    }
}
