using Microsoft.AspNetCore.Mvc;
using WebAppReact.Data;
using WebAppReact.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using WebAppReact.Data.Migrations;
using Kontakt = WebAppReact.Models.Kontakt;

namespace WebAppReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KontaktController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KontaktController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetContacts")]
        public IActionResult GetConstacts()
        {
            var contactShortInfo = _context.Kontakty
                .Select(k => new
                {
                    k.Id,
                    k.Imie,
                    k.Nazwisko,
                    k.Email
                })
                .ToList();
            return Ok(contactShortInfo);
        }

        [HttpDelete]
        [Route("DeleteContact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            var kontakt = _context.Kontakty.FirstOrDefault(k => k.Id == id);

            if (kontakt == null)
            {
                return NotFound();
            }

            _context.Kontakty.Remove(kontakt);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet]
        [Route("GetContact/{id}")]
        public IActionResult GetContact(int id)
        {
            var kontakt = _context.Kontakty.FirstOrDefault(k => k.Id == id);
            if (kontakt == null)
            {
                return NotFound();
            }
            return Ok(kontakt);
        }

        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> AddContact([FromBody] Kontakt kontakt)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Kontakty.Add(kontakt);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction(nameof(GetContact), new { id = kontakt.Id }, kontakt);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("EditContact/{id}")]
        public IActionResult EditContact(int id, [FromBody] Kontakt updatedContact)
        {
            var kontakt = _context.Kontakty.FirstOrDefault(k => k.Id == id);
            if (kontakt == null)
            {
                return NotFound();
            }

            // Zaktualizuj dane kontaktu na podstawie przekazanych danych
            kontakt.Imie = updatedContact.Imie;
            kontakt.Nazwisko = updatedContact.Nazwisko;
            kontakt.Email = updatedContact.Email;
            kontakt.Haslo = updatedContact.Haslo;
            kontakt.Telefon = updatedContact.Telefon;
            kontakt.Kategoria = updatedContact.Kategoria;
            kontakt.Podkategoria = updatedContact.Podkategoria;
            kontakt.DataUrodzenia = updatedContact.DataUrodzenia;

            // Zapisz zmiany w bazie danych
            _context.SaveChanges();

            return Ok(kontakt);
        }
    }
}
