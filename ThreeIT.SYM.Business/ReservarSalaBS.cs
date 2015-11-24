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
                db.ReservaSala.Add(new ReservaSala() { CodigoSalaReuniao = 1, CodigoUsuario = 1, DescricaoAgendamento = "Reunião de KickOff", CodigoStatusReservaSala = 2, CodigoUsuarioAlteracao = 1, StartDate = DateTime.Now, DataHoraFinal = DateTime.Now, DataAlteracao = DateTime.Now });

                db.SaveChanges();
            }
            
        }

    }
}
