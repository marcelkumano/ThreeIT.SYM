﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ThreeIT.SYM.Models
{
    public class Unidade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoUnidade { get; set; }

        [StringLength(30, MinimumLength = 3)]
        public string NomeUnidade { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string DescricaoUnidade { get; set; }

        public DateTime DataAlteracao { get; set; }

        public int CodigoUsuarioAlteracao { get; set; }
    }
}