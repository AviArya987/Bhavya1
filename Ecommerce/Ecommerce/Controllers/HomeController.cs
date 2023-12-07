using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Diagnostics;

namespace Ecommerce.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly SqlConnection sqlConnection;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            string constr = _configuration.GetConnectionString("DbConn");
            sqlConnection = new SqlConnection(constr);
        }

        //[HttpPost]
        //public IActionResult LoginAsync(LoginModel model)   
        //{
        //    return View();
        //}

        [HttpPost, ValidateAntiForgeryToken]
        public IActionResult Login(LoginModel model)
        {
            return View();
        }

        public IActionResult Index()
        {

            //ProductPermission permission = new ProductPermission();
            //permission.lstproducts = permission.GetAllProducts(sqlConnection);
            return View("Form");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Form()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SubmitForm([FromBody] SubjectModel model)
        {
            try
            {
                DbResponse response = new BALApplication().SaveSubject(sqlConnection, model);
                return Json(new { responseCode = response.ResponseCode, responseMessage = response.ResponseMessage });
            }
            catch(Exception ex){
                return Json(new { responseCode = 400, responseMessage = "Unexpected Error Occured" });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}