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
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Missão", DescricaoSala = "Sala de Reuniões Missão", CapacidadeSala = 6, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.UtcNow, DisponibilidadeInicio = new DateTime(1900, 01, 01, 8, 0, 0, DateTimeKind.Utc), DispoonibilidadeFim = new DateTime(1900, 01, 01, 18, 0, 0, DateTimeKind.Utc), PossuiProjetor = false });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Paixão", DescricaoSala = "Sala de Reuniões Paixão", CapacidadeSala = 12, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.UtcNow, DisponibilidadeInicio = new DateTime(1900, 01, 01, 8, 0, 0, DateTimeKind.Utc), DispoonibilidadeFim = new DateTime(1900, 01, 01, 18, 0, 0, DateTimeKind.Utc), PossuiProjetor = true });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Extraordinário", DescricaoSala = "Sala de Reuniões Extraordinario", CapacidadeSala = 6, CodigoUnidade = 1, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.UtcNow, DisponibilidadeInicio = new DateTime(1900, 01, 01, 8, 0, 0, DateTimeKind.Utc), DispoonibilidadeFim = new DateTime(1900, 01, 01, 18, 0, 0, DateTimeKind.Utc), PossuiProjetor = false });
                db.SalaReuniao.Add(new SalaReuniao() { NomeSala = "Sala JB", DescricaoSala = "Sala de Reuniões JB", CapacidadeSala = 8, CodigoUnidade = 2, CodigoUsuarioAlteracao = 1, DataAlteracao = DateTime.UtcNow, DisponibilidadeInicio = new DateTime(1900, 01, 01, 8, 0, 0, DateTimeKind.Utc), DispoonibilidadeFim = new DateTime(1900, 01, 01, 18, 0, 0, DateTimeKind.Utc), PossuiProjetor = true });

                db.SaveChanges();
            }
        }
        public List<SalaReuniao> ListarSalas(int codigoUnidade, int quantidadePessoas, bool? possuiProjetor)
        {
            using (SYMContext db = new SYMContext())
            {
                List<SalaReuniao> ListaSalas = db.SalaReuniao.Where(p => codigoUnidade == p.CodigoUnidade && 
                                                                         quantidadePessoas <= p.CapacidadeSala &&
                                                                         (possuiProjetor == null || p.PossuiProjetor == possuiProjetor)).ToList();

                foreach (var item in ListaSalas)
                {
                    item.DataAlteracao = DateTime.SpecifyKind(item.DataAlteracao, DateTimeKind.Utc);
                    item.DisponibilidadeInicio = DateTime.SpecifyKind(item.DisponibilidadeInicio, DateTimeKind.Utc);
                    item.DispoonibilidadeFim = DateTime.SpecifyKind(item.DispoonibilidadeFim, DateTimeKind.Utc);
                }

                return ListaSalas;
            }
        }
    }
}
