using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;

namespace ThreeIT.SYM.Business
{
    public class UsuarioBS
    {
        public void InicializarUsuario()
        {
            using (SYMContext db = new SYMContext())
            {
                db.Usuario.Add(new Usuario() { NomeUsuario = "Vitor Albani", UsuarioPlanum = "", EnderecoEmail = "Vitor.Albani@bsitecnologia.com.br", DataAlteracao = DateTime.Now, CodigoUsuarioAlteracao = 1 });
                db.Usuario.Add(new Usuario() { NomeUsuario = "Rafael Marchetti", UsuarioPlanum = "", EnderecoEmail = "Rafael.Marchetti@bsitecnologia.com.br", DataAlteracao = DateTime.Now, CodigoUsuarioAlteracao = 1 });
                db.Usuario.Add(new Usuario() { NomeUsuario = "Marcel Kumano", UsuarioPlanum = "", EnderecoEmail = "Marcel.Kumano@bsitecnologia.com.br", DataAlteracao = DateTime.Now, CodigoUsuarioAlteracao = 1 });

                db.SaveChanges();
            }
        }
    }
}
