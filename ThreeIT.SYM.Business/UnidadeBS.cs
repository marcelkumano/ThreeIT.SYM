using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;

namespace ThreeIT.SYM.Business
{
    public class UnidadeBS
    {

        public List<Unidade> ListarUnidades()
        {
            List<Unidade> ListaUnidades = new List<Unidade>();
            using (SYMContext db = new SYMContext())
            {
                ListaUnidades = db.Unidade.ToList();
            }

            return ListaUnidades;
        }

        public Unidade DetalharUnidade(int codigoUnidade)
        {
            using (SYMContext db = new SYMContext())
            {
                return db.Unidade.Where(p => p.CodigoUnidade == codigoUnidade).FirstOrDefault();
            }
        }


        public void InicializarUnidade()
        {
            using (SYMContext db = new SYMContext())
            {
                db.Unidade.Add(new Unidade() { DescricaoUnidade = "Unidade Consolacao", NomeUnidade = "Consolação", DataAlteracao = DateTime.Now, CodigoUsuarioAlteracao = 1 });
                db.Unidade.Add(new Unidade() { DescricaoUnidade = "Unidade JB", NomeUnidade = "José Bonifácio", DataAlteracao = DateTime.Now, CodigoUsuarioAlteracao = 1 });
                
                db.SaveChanges();
            }
        }
    }
}
