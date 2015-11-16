using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThreeIT.SYM.WebApi.Models
{
    public class ReservaSala
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoReserva { get; set; }

        [ForeignKey("SalaReuniao")]
        public int CodigoSalaReuniao { get; set; }

        [ForeignKey("Usuario")]
        public int CodigoUsuario { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DataHoraFinal { get; set; }


        public string DescricaoAgendamento { get; set; }


        public SalaReuniao SalaReuniao { get; set; }
        public Usuario Usuario { get; set; }


    }
}