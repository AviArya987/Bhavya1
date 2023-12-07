using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Ecommerce.Controllers
{
    public class Users : Controller
    {
        private readonly IConfiguration _configuration;
        public Users(IConfiguration configuration) {
            _configuration = configuration;
            string constr = _configuration.GetConnectionString("DbConn");
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
