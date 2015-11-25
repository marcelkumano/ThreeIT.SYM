using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThreeIT.SYM.DataAccess;
using ThreeIT.SYM.Models;

namespace ThreeIT.SYM.Business
{
    public class SalaReuniaoBS
    {
        public void InicializarSalaReuniao()
        {
            using (SYMContext db = new SYMContext())
            {
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Missão", DescricaoSala = "Sala de Reuniões Missão", CapacidadeSala = 6, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.Now, DisponibilidadeInicio = DateTime.Now, DispoonibilidadeFim = DateTime.Now });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Paixão", DescricaoSala = "Sala de Reuniões Paixão", CapacidadeSala = 12, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.Now, DisponibilidadeInicio = DateTime.Now, DispoonibilidadeFim = DateTime.Now });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Extraordinário", DescricaoSala = "Sala de Reuniões Extraordinario", CapacidadeSala = 6, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.Now, DisponibilidadeInicio = DateTime.Now, DispoonibilidadeFim = DateTime.Now });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Sala JB", DescricaoSala = "Sala de Reuniões JB", CapacidadeSala = 8, CodigoUnidade = 2, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.Now, DisponibilidadeInicio = DateTime.Now, DispoonibilidadeFim = DateTime.Now });

                db.SaveChanges();
            }
        }
        public List<SalaReuniao> ListarSalas(int idUnidade, int QTDPessoas)
        {
            using (SYMContext db = new SYMContext())
            {
                List<SalaReuniao> ListaSalas = db.SalaReuniao.Where(p => idUnidade == p.CodigoUnidade && QTDPessoas <= p.CapacidadeSala).ToList();

                return ListaSalas;
            }
        }
    }
}
