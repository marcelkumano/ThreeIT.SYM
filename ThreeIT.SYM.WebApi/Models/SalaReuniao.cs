using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ThreeIT.SYM.WebApi.Models
{
    public class SalaReuniao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoSalaReuniao { get; set; }

        [ForeignKey("Unidade")]
        public int CodigoUnidade { get; set; }

        public string NomeSala { get; set; }

        public string DescricaoSala { get; set; }

        public int CapacidadeSala { get; set; }

        public Unidade Unidade { get; set; }
    }
}