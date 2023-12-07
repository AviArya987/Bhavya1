using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Ecommerce.Controllers
{
    public class AdmissionController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly SqlConnection sqlConnection;

        public AdmissionController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            string constr = _configuration.GetConnectionString("DbConn");
            sqlConnection = new SqlConnection(constr);
        }

        public IActionResult AdmissionDashboard()
        {
            return View();
        }

        public IActionResult AdmissionForm()
        {
            return View();
        }


        [HttpPost]
        public JsonResult InsertUpdtAdmDetail([FromBody] AdmissionDetailModel model)
        {
            try
            {
                DbResponse response = new BALAdmission().InsertUpdtAdmission(sqlConnection, model);
                return Json(new { responseCode = response.ResponseCode, responseMessage = response.ResponseMessage });
            }
            catch (Exception ex)
            {
                return Json(new { responseCode = 400, responseMessage = "Unexpected Error Occured" });
            }
        }
    }
}
