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
                db.StatusReservaSala.Add(new StatusReservaSala() { DescricaoStatusReservaSala = "Sala Vaga" });
                db.StatusReservaSala.Add(new StatusReservaSala() { DescricaoStatusReservaSala = "Sala Ocupada" });
                
                db.SaveChanges();
            }
        }
    }
}
