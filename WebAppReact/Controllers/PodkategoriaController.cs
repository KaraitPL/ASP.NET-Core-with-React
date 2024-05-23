using Microsoft.AspNetCore.Mvc;
using WebAppReact.Data;

namespace WebAppReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PodkategoriaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PodkategoriaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetSubcategories")]
        public IActionResult GetSubategories()
        {
             var subcategories = _context.Podkategorie.ToList();
             return Ok(subcategories);
        }
    }
}
