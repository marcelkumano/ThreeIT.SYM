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
                db.ReservaSala.Add(new ReservaSala() { CodigoSalaReuniao = 1, CodigoUsuario = 1, DescricaoAgendamento = "Reunião de KickOff", CodigoStatusReservaSala = 2, CodigoUsuarioAlteracao = 1, DataHoraInicial = DateTime.Now, DataHoraFinal = DateTime.Now, DataAlteracao = DateTime.Now });

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
    }
}
