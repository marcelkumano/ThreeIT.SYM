﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;
using ThreeIT.SYM.Business.Extensions;


namespace ThreeIT.SYM.Business
{
    public class ReservarSalaBS
    {
        public void InicializarReservaSalas()
        {
            using (SYMContext db = new SYMContext())
            {
                //db.ReservaSala.Add(new ReservaSala() { CodigoSalaReuniao = 1, CodigoUsuario = 1, DescricaoAgendamento = "Reunião de KickOff", CodigoStatusReservaSala = 2, CodigoUsuarioAlteracao = 1, DataHoraInicial = DateTime.Today.AddHours(9), DataHoraFinal = DateTime.Today.AddHours(9).AddMinutes(29).AddSeconds(59), DataAlteracao = DateTime.Now });

                db.SaveChanges();
            }

        }

        public List<ReservaSala> ListarReservasPorData(DateTime dataInicio, DateTime dataFim, int codigoUnidade)
        {
            using (SYMContext db = new SYMContext())
            {
                List<ReservaSala> listaReservas =
                (from reserva in db.ReservaSala
                 join sala in db.SalaReuniao on reserva.CodigoSalaReuniao equals sala.CodigoSalaReuniao
                 where sala.CodigoUnidade == codigoUnidade
                    && reserva.DataHoraInicial >= dataInicio
                    && reserva.DataHoraInicial <= dataFim
                 select reserva).ToList();

                foreach (var item in listaReservas)
                {
                    item.DataAlteracao = DateTime.SpecifyKind(item.DataAlteracao, DateTimeKind.Utc);
                    item.DataHoraInicial = DateTime.SpecifyKind(item.DataHoraInicial, DateTimeKind.Utc);
                    item.DataHoraFinal = DateTime.SpecifyKind(item.DataHoraFinal, DateTimeKind.Utc);

                    if (item.DataInicioOcupacao != null)
                        item.DataInicioOcupacao = DateTime.SpecifyKind(item.DataInicioOcupacao.Value, DateTimeKind.Utc);

                    item.DataLimiteOcupacao = DateTime.SpecifyKind(item.DataLimiteOcupacao, DateTimeKind.Utc);

                    if (item.DataLimiteOcupacao != default(DateTime))
                        item.ExpirouLimiteOcupacao = DateTimeExtensions.BrasilNow() > item.DataLimiteOcupacao;
                }

                return listaReservas;
            }
        }

        public void IncluirReserva(ReservaSala novaReserva)
        {
            novaReserva.CodigoUsuario = 1;
            novaReserva.CodigoStatusReservaSala = 1;
            novaReserva.CodigoUsuarioAlteracao = 1;
            novaReserva.DataAlteracao = DateTime.UtcNow;

            //Iniciar sem ocupação
            novaReserva.DataInicioOcupacao = null;
            novaReserva.DataLimiteOcupacao = novaReserva.DataHoraInicial.AddMinutes(15);

            //Se for 8:00 reservar até as 7:59
            if (novaReserva.DataHoraFinal.Minute == 0 ||
                novaReserva.DataHoraFinal.Minute == 30)
                novaReserva.DataHoraFinal = novaReserva.DataHoraFinal.AddSeconds(-1);

            using (SYMContext db = new SYMContext())
            {
                db.ReservaSala.Add(novaReserva);

                db.SaveChanges();
            }
        
        }

        public bool ValidarReservaExistente(ReservaSala novaReserva) 
        {
            //Se for 8:00 reservar até as 7:59
            if (novaReserva.DataHoraFinal.Minute == 0 ||
                novaReserva.DataHoraFinal.Minute == 30)
                novaReserva.DataHoraFinal = novaReserva.DataHoraFinal.AddSeconds(-1);

            using (SYMContext db = new SYMContext())
            {
                foreach (ReservaSala reservaBase in db.ReservaSala.Where(p => p.CodigoSalaReuniao == novaReserva.CodigoSalaReuniao).ToList())
                {
                    if (novaReserva.DataHoraInicial >= reservaBase.DataHoraInicial && novaReserva.DataHoraInicial <= reservaBase.DataHoraFinal) 
                    {
                        return true;
                    }

                    if (novaReserva.DataHoraFinal >= reservaBase.DataHoraInicial && novaReserva.DataHoraInicial <= reservaBase.DataHoraFinal)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public ReservaSala ConsultarReserva(int codigoReserva)
        {
            using (SYMContext db = new SYMContext())
            {
                ReservaSala dados = db.ReservaSala.Where(p => p.CodigoReserva == codigoReserva).FirstOrDefault();
                return dados;
            }
        }

        public void OcuparReserva(ReservaSala param) 
        {
            ReservaSala reservaBase = null;

            using (SYMContext db = new SYMContext())
            {
                reservaBase = db.ReservaSala.Where(p => p.CodigoReserva == param.CodigoReserva).FirstOrDefault();
                reservaBase.DataInicioOcupacao = DateTime.UtcNow;

                db.ReservaSala.Add(reservaBase);

                db.SaveChanges();
            }
        }
    }
}
