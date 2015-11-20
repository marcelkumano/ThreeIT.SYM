using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThreeIT.SYM.Models
{
    public class StatusReservaSala
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int CodigoStatusReservaSala { get; set; }

        public string DescricaoStatusReservaSala { get; set; }

    }
}
