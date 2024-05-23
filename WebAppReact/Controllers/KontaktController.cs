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

        // Metoda HTTP GET do pobierania skróconych informacji o kontaktach
        [HttpGet]
        [Route("GetContacts")]
        public IActionResult GetConstacts()
        {
            // Pobierz skrócone informacje o kontaktach
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

        // Metoda HTTP DELETE do usuwania kontaktu
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

        // Metoda HTTP GET do pobierania szczegółowych informacji o kontakcie
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

        // Metoda HTTP POST do dodawania nowego kontaktu
        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> AddContact([FromBody] Kontakt kontakt)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (IsEmailUnique(kontakt.Email)) // Sprawdź, czy adres e-mail jest unikalny
                    {
                        _context.Kontakty.Add(kontakt);
                        await _context.SaveChangesAsync();

                        return CreatedAtAction(nameof(GetContact), new { id = kontakt.Id }, kontakt);
                    }
                    else
                    {
                        ModelState.AddModelError("email", "Adres e-mail jest już zajęty.");
                        return BadRequest(ModelState);
                    }
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

        // Metoda HTTP PUT do edycji istniejącego kontaktu
        [HttpPut("EditContact/{id}")]
        public IActionResult EditContact(int id, [FromBody] Kontakt updatedContact)
        {
            // Znajdź kontakt o podanym identyfikatorze
            var kontakt = _context.Kontakty.FirstOrDefault(k => k.Id == id);
            if (kontakt == null)
            {
                return NotFound(); 
            }

            // Sprawdź, czy nowy adres e-mail jest unikalny
            if (!IsEmailUnique(updatedContact.Email) && updatedContact.Email != kontakt.Email)
            {
                ModelState.AddModelError("email", "Adres e-mail jest już zajęty.");
                return BadRequest(ModelState);
            }

            kontakt.Imie = updatedContact.Imie;
            kontakt.Nazwisko = updatedContact.Nazwisko;
            kontakt.Email = updatedContact.Email;
            kontakt.Haslo = updatedContact.Haslo;
            kontakt.Telefon = updatedContact.Telefon;
            kontakt.Kategoria = updatedContact.Kategoria;
            kontakt.Podkategoria = updatedContact.Podkategoria;
            kontakt.DataUrodzenia = updatedContact.DataUrodzenia;

            _context.SaveChanges();

            return Ok(kontakt);
        }

        // Metoda sprawdzająca unikalność adresu e-mail
        private bool IsEmailUnique(string email)
        {
            if (!_context.Kontakty.Any())
            {
                return true;
            }
            return !_context.Kontakty.Any(x => x.Email == email); // Sprawdź, czy adres e-mail jest unikalny
        }

    }
}