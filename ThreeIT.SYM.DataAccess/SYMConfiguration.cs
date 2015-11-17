    using System;  
    using System.Data.Entity;  
    using System.Data.Entity.Migrations;  
    using System.Linq;  


namespace ThreeIT.SYM.DataAccess
{
    internal sealed class SYMConfiguration : DbMigrationsConfiguration<SYMContext>
    {
        public SYMConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = false;
        }

    }
}
