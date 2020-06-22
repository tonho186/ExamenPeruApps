using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveFormWeb.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Duracion { get; set; }
        public int NumParticipantes { get; set; }
        public int NumComisarios { get; set; }
        public int ComplejoId { get; set; }
    }
}
