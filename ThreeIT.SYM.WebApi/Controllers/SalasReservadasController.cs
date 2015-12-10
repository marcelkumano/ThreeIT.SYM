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
using ThreeIT.SYM.Business.Extensions;

namespace ThreeIT.SYM.WebApi.Controllers
{
    public class SalasReservadasController : ApiController
    {
        //
        // GET: /SalasReservadas/
        // http://localhost:2244/sym/services/api/SalasReservadas?quantidadePessoas=5&codigoUnidade=1&intervaloData=1&possuiProjetor=
        public SalasAgendadas Get(int quantidadePessoas, int codigoUnidade, IntervaloPesquisaSalasEnum intervaloData, bool? possuiProjetor)
        {
            DateTime dataInicio, dataFim;

            switch (intervaloData)
            {
                case IntervaloPesquisaSalasEnum.Hoje:
                    dataInicio = new DateTime(DateTime.Today.Ticks, DateTimeKind.Utc);
                    dataFim = new DateTime(DateTime.Today.AddWorkingDays(0 + 1).AddMinutes(-1).Ticks, DateTimeKind.Utc);
                    break;
                case IntervaloPesquisaSalasEnum.ProximosSeteDias:
                    dataInicio = new DateTime(DateTime.Today.Ticks, DateTimeKind.Utc);
                    dataFim = new DateTime(DateTime.Today.AddWorkingDays(7).AddMinutes(-1).Ticks, DateTimeKind.Utc);
                    break;
                case IntervaloPesquisaSalasEnum.ProximosTrintaDias:
                    dataInicio = new DateTime(DateTime.Today.Ticks, DateTimeKind.Utc);
                    dataFim = new DateTime(DateTime.Today.AddWorkingDays(15).AddMinutes(-1).Ticks, DateTimeKind.Utc);
                    break;

                default:
                    dataInicio = DateTime.MinValue;
                    dataFim = DateTime.MaxValue;
                    break;
            }


            List<SalaReuniao> listaSalas = new SalaReuniaoBS().ListarSalas(codigoUnidade, quantidadePessoas, possuiProjetor);
            List<ReservaSala> listaReservas = new ReservarSalaBS().ListarReservasPorData(dataInicio, dataFim, codigoUnidade);

            SalasAgendadas pesquisaAgendamento = new SalasAgendadas();

            pesquisaAgendamento.meses = new List<Meses>();

            bool chegouFim = false;

            DateTime dataAtual = dataInicio;
            Meses mesAtual = new Meses();

            while (!chegouFim)
            {
                Dias dia = new Dias();
                dia.diaSemana = dataAtual.DayName();
                dia.numeroDia = dataAtual.Day;
                dia.salas = new List<Salas>();

                if (dataAtual.IsWorkingDay())
                {
                    if (pesquisaAgendamento.meses.Where(w => w.ano == dataAtual.Year).Count() == 0)
                    {
                        mesAtual = new Meses();
                        mesAtual.ano = dataAtual.Year;
                        mesAtual.numeroMes = dataAtual.Month;
                        mesAtual.mes = dataAtual.MonthName();
                        mesAtual.descricaoMes = string.Format("{0} {1}", mesAtual.mes, DateTime.UtcNow.Year);
                        mesAtual.dias = new List<Dias>();

                        pesquisaAgendamento.meses.Add(mesAtual);
                    }

                    foreach (SalaReuniao salaAtual in listaSalas)
                    {
                        Salas sala = new Salas();

                        sala.codigoUnidade = salaAtual.CodigoUnidade;
                        sala.nomeUnidade = new UnidadeBS().DetalharUnidade(salaAtual.CodigoUnidade).NomeUnidade;
                        sala.codigoSala = salaAtual.CodigoSalaReuniao;
                        sala.nomeSala = salaAtual.NomeSala;
                        sala.quantidadeLugares = salaAtual.CapacidadeSala;
                        sala.horarioInicial = salaAtual.DisponibilidadeInicio;
                        sala.horarioFinal = salaAtual.DispoonibilidadeFim;

                        sala.reservas = new List<Reservas>();

                        foreach (ReservaSala reservaBase in listaReservas.Where(p => p.CodigoSalaReuniao == salaAtual.CodigoSalaReuniao
                                                                              && p.DataHoraInicial.ToShortDateString() == dataAtual.ToShortDateString()))
                        {
                            Reservas reserva = new Reservas();
                            reserva.horarioFinal = reservaBase.DataHoraFinal;
                            reserva.horarioInicial = reservaBase.DataHoraInicial;
                            reserva.idAgendamento = reservaBase.CodigoReserva;
                            reserva.expirouLimiteOcupacao = reservaBase.ExpirouLimiteOcupacao;
                            reserva.reservadoPara = "";

                            sala.reservas.Add(reserva);
                        }

                        dia.salas.Add(sala);
                    }

                    mesAtual.dias.Add(dia);
                }

                dataAtual = dataAtual.AddDays(1);

                if (dataAtual > dataFim)
                {
                    chegouFim = true;
                }
            }

                return pesquisaAgendamento;
        }

        public void Post(ReservaSala postData)
        {
            postData.DataHoraInicial = postData.DataHoraInicial.ToUniversalTime();
            postData.DataHoraFinal = postData.DataHoraFinal.ToUniversalTime();

            if (postData.CodigoSalaReuniao == default(int) ||
                postData.DescricaoAgendamento == default(string) ||
                postData.DataHoraInicial == default(DateTime) ||
                postData.DataHoraFinal == default(DateTime))
            {
                HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.BadRequest);
                message.Content = new StringContent("Um ou mais parâmetros de entrada estão inválidos.");
                throw new HttpResponseException(message);
            }



            if (new ReservarSalaBS().ValidarReservaExistente(postData))
            {
                HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.Conflict);
                message.Content = new StringContent("A sala não está disponível na data solicitada.");
                throw new HttpResponseException(message);
            }

            new ReservarSalaBS().IncluirReserva(postData);
        }

        private Dias PreencherListas(int contadorDias, List<SalaReuniao> ListaSalas, List<ReservaSala> ListaReserva)
        {
            Dias _Dias = new Dias();
            _Dias.diaSemana = CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(DateTime.UtcNow.AddDays(contadorDias).DayOfWeek);
            _Dias.numeroDia = DateTime.UtcNow.AddDays(contadorDias).Day;
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
                    if (Reserva.DataHoraInicial.Day == DateTime.UtcNow.AddDays(contadorDias).Day)
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

        public ReservaSala Get(int CodigoReserva)
        {
            ReservaSala dados = new ReservaSala();
            dados = new ReservarSalaBS().ConsultarReserva(CodigoReserva);
            return dados;
        }
    }
}
