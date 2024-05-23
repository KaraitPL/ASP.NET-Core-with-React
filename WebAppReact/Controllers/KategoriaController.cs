using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppReact.Data;

namespace WebAppReact.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
        public class KategoriaController : ControllerBase
        {
            private readonly ApplicationDbContext _context;

            public KategoriaController(ApplicationDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            [Route("GetCategories")]
            public IActionResult GetCategories()
            {
                var categories = _context.Kategorie.ToList();
                return Ok(categories);
            }
        }

}
