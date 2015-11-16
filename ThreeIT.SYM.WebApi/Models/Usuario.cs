using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ThreeIT.SYM.WebApi.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoUsuario { get; set; }

        public string UsuarioPlanum { get; set; }

        public string NomeUsuario { get; set; }

        public string EnderecoEmail { get; set; }
    }
}