using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThreeIT.SYM.Models
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

        [ForeignKey("StatusReservaSala")]
        public int CodigoStatusReservaSala { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime DataHoraFinal { get; set; }

        public string DescricaoAgendamento { get; set; }

        public DateTime DataAlteracao { get; set; }

        public int CodigoUsuarioAlteracao { get; set; }


        public StatusReservaSala StatusReservaSala { get; set; }

        public Usuario Usuario { get; set; }

        public SalaReuniao SalaReuniao { get; set; }

    }
}