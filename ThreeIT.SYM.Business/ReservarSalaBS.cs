using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;

namespace ThreeIT.SYM.Business
{
    public class ReservarSalaBS
    {
        public void InicializarReservaSalas()
        {
            using (SYMContext db = new SYMContext())
            {
                db.ReservaSala.Add(new ReservaSala() { CodigoSalaReuniao = 1, CodigoUsuario = 1, DescricaoAgendamento = "Reunião de KickOff", CodigoStatusReservaSala = 2, CodigoUsuarioAlteracao = 1, DataHoraInicial = DateTime.Today.AddHours(9), DataHoraFinal = DateTime.Today.AddHours(9).AddMinutes(29).AddSeconds(59), DataAlteracao = DateTime.Now });

                db.SaveChanges();
            }

        }

        public List<ReservaSala> BuscarReservas(List<SalaReuniao> ListaSalas, int RangeData)
        {
            using (SYMContext db = new SYMContext())
            {
                List<ReservaSala> ListaReservaSala = new List<ReservaSala>();

                foreach (SalaReuniao Sala in ListaSalas)
                {
                    List<ReservaSala> Reserva = db.ReservaSala.Where(p => Sala.CodigoSalaReuniao == p.CodigoSalaReuniao).ToList();

                    ListaReservaSala.AddRange(Reserva);
                }
                return ListaReservaSala;
            }
        }


        public void IncluirReserva(ReservaSala novaReserva)
        {
            novaReserva.CodigoUsuario = 1;
            novaReserva.CodigoStatusReservaSala = 2;
            novaReserva.CodigoUsuarioAlteracao = 1;
            novaReserva.DataAlteracao = DateTime.Now;

            using (SYMContext db = new SYMContext())
            {
                db.ReservaSala.Add(novaReserva);

                db.SaveChanges();
            }
        
        }

        public bool ValidarReservaExistente(ReservaSala novaReserva) 
        {
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
    }
}
