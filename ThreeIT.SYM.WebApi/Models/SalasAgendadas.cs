using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThreeIT.SYM.WebApi.Models
{
    public class SalasAgendadas
    {
        public List<Meses> Meses { get; set; }
    }

    public class Meses
    {
        public int numeroMes { get; set; }
        public string mes { get; set; }
        public string descricaoMes { get; set; }
        public List<Dias> dias { get; set; }
    }

    public class Dias
    {
        public int numeroDia { get; set; }
        public string diaSemana { get; set; }
        public List<Salas> salas { get; set; }
    }

    public class Salas
    {
        public string nomeSala { get; set; }
        public int quantidadeLugares { get; set; }
        public DateTime horarioInicial { get; set; }
        public DateTime horarioFinal { get; set; }
        public List<Reservas> reservas { get; set; }
    }

    public class Reservas
    {
        public int idAgendamento { get; set; }
        public DateTime horarioInicial { get; set; }
        public DateTime horarioFinal { get; set; }
        public string reservadoPara { get; set; }
    }
}