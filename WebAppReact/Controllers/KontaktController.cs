using Microsoft.AspNetCore.Mvc;
using WebAppReact.Data;
using WebAppReact.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

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
            List<Kontakt> list = _context.Kontakty.ToList();
            return Ok(list);
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
    }
}
