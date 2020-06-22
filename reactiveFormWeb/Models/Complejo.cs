using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveFormWeb.Models
{
    public class Complejo
    {
        public int Id { get; set; }
        public string Localizacion { get; set; }
        public string Jefe { get; set; }
        public decimal Area { get; set; }
        public List<Evento> Eventos { get; set; }
    }
}
