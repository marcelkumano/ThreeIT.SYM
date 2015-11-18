using ThreeIT.SYM.Models;
using System.Data.Entity;

namespace ThreeIT.SYM.DataAccess
{
    public class SYMContext : DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<Unidade> Unidade { get; set; }

        public DbSet<StatusReservaSala> StatusReservaSala { get; set; }

        public DbSet<SalaReuniao> SalaReuniao { get; set; } 

        public DbSet<ReservaSala> ReservaSala { get; set; }
    }
}
