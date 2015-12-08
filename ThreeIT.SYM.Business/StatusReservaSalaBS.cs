using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;

namespace ThreeIT.SYM.Business
{
    public class StatusReservaSalaBS
    {
        public void InicializarStatusReservaSala()
        {
            using (SYMContext db = new SYMContext())
            {
                db.StatusReservaSala.Add(new StatusReservaSala() { DescricaoStatusReservaSala = "Reservado" });
                db.StatusReservaSala.Add(new StatusReservaSala() { DescricaoStatusReservaSala = "Cancelado" });
                db.StatusReservaSala.Add(new StatusReservaSala() { DescricaoStatusReservaSala = "Cancelada devido à ocupação não sinalizada" });
                
                db.SaveChanges();
            }
        }
    }
}
