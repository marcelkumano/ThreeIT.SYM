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
                    dataInicio = DateTimeExtensions.BrasilToday();
                    dataFim = DateTimeExtensions.BrasilToday().AddWorkingDays(1).AddMinutes(-1); ;
                    break;
                case IntervaloPesquisaSalasEnum.ProximosSeteDias:
                    dataInicio = DateTimeExtensions.BrasilToday();
                    dataFim = DateTimeExtensions.BrasilToday().AddWorkingDays(7).AddMinutes(-1);
                    break;
                case IntervaloPesquisaSalasEnum.ProximosTrintaDias:
                    dataInicio = DateTimeExtensions.BrasilToday();
                    dataFim = DateTimeExtensions.BrasilToday().AddWorkingDays(15).AddMinutes(-1);
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

                    dia = this.TratarHorarioComercialHoje(dia);

                    if (dia != null)
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

        public ReservaSala Get(int CodigoReserva)
        {
            ReservaSala dados = new ReservaSala();
            dados = new ReservarSalaBS().ConsultarReserva(CodigoReserva);
            return dados;
        }

        private Dias TratarHorarioComercialHoje(Dias dia)
        {
            if (DateTimeExtensions.BrasilNow().Hour > 18)
            {
                return null;
            }

            if (DateTimeExtensions.BrasilNow().Hour > 8)
            {
                DateTime horarioInicial = new DateTime(1900, 01, 01, 0, 0, 0, DateTimeKind.Utc);

                if (DateTimeExtensions.BrasilNow().Minute < 30)
                {
                    horarioInicial = horarioInicial.AddHours(DateTimeExtensions.BrasilNow().Hour);
                    //horarioInicial = horarioInicial.AddMinutes(30);
                }
                else
                {
                    horarioInicial = horarioInicial.AddHours(DateTimeExtensions.BrasilNow().Hour);
                    horarioInicial = horarioInicial.AddMinutes(30);
                }

                foreach (var item in dia.salas)
                {
                    item.horarioInicial = horarioInicial;
                }
            }

            return dia;

        }
    }
}
