using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactiveFormWeb.Models;

namespace reactiveFormWeb.Controllers
{
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class ComplejosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComplejosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Complejos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Complejo>>> GetComplejos()
        {
            return await _context.Complejos.ToListAsync();
        }

        // GET: api/Complejos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplejo([FromRoute] int id, bool incluirEventos = false)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Complejo complejo;

            if (incluirEventos)
            {
                complejo = await _context.Complejos.Include(x => x.Eventos).SingleOrDefaultAsync(m => m.Id == id);
            }
            else
            {
                complejo = await _context.Complejos.SingleOrDefaultAsync(m => m.Id == id);
            }

            if (complejo == null)
            {
                return NotFound();
            }

            return Ok(complejo);
        }

        private async Task CrearOEditarEventos(List<Evento> eventos)
        {
            List<Evento> eventosACrear = eventos.Where(x => x.Id == 0).ToList();
            List<Evento> eventosAEditar = eventos.Where(x => x.Id != 0).ToList();

            if (eventosACrear.Any())
            {
                await _context.AddRangeAsync(eventosACrear);
            }

            if (eventosAEditar.Any())
            {
                _context.UpdateRange(eventosAEditar);
            }

        }

        // PUT: api/Complejos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComplejo(int id, Complejo complejo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != complejo.Id)
            {
                return BadRequest();
            }

            _context.Entry(complejo).State = EntityState.Modified;

            try
            {
                await CrearOEditarEventos(complejo.Eventos);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComplejoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Complejos
        [HttpPost]
        public async Task<ActionResult<Complejo>> PostComplejo(Complejo complejo)
        {
            _context.Complejos.Add(complejo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComplejo", new { id = complejo.Id }, complejo);
        }

        // DELETE: api/Complejos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Complejo>> DeleteComplejo(int id)
        {
            var complejo = await _context.Complejos.FindAsync(id);
            if (complejo == null)
            {
                return NotFound();
            }

            _context.Complejos.Remove(complejo);
            await _context.SaveChangesAsync();

            return complejo;
        }

        private bool ComplejoExists(int id)
        {
            return _context.Complejos.Any(e => e.Id == id);
        }
    }
}
