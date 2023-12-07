using Azure;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Ecommerce.Models
{
    public class UserPermission
    {
        public IEnumerable<Users> users { get; set; }

        public JsonResult ReisterUser(Users user, SqlConnection conn)
        {
            if (user != null)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", user.Id);
                parameters.Add("@Name", user.Name);
                parameters.Add("@Mobile", user.Mobile);
                parameters.Add("@Password", user.Password);
                var response = SqlMapper.QuerySingle<DbResponse>(conn, "RegisterUser", parameters, commandType: CommandType.StoredProcedure);
                return new JsonResult(new { response = response });
            }
            else
            {
                return new JsonResult(new { response = "Error Occured" });
            }
            
        }

    }
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mobile{ get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }

    public class LoginModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    public class SubjectModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Sub1Id { get; set; }
        public string? Sub1Name { get; set; }
        public string? Sub2Name { get; set; }
        public string? Sub3Name { get; set; }
        public string? Sub4Name { get; set; }
        public string? Sub5Name { get; set; }
        public int Sub2Id { get; set; }
        public int Sub3Id { get; set; }
        public int Sub4Id { get; set; }
        public int Sub5Id { get; set; }
    }

    public class BALApplication
    {
        public DbResponse SaveSubject(SqlConnection connnString, SubjectModel mdl)
        {
            connnString.Open();
            var parameters = new DynamicParameters();
            parameters.Add("@Id", mdl.Id);
            parameters.Add("@Name", mdl.Name);
            parameters.Add("@Sub1Id", mdl.Sub1Id);
            parameters.Add("@Sub2Id", mdl.Sub2Id);
            parameters.Add("@Sub3Id", mdl.Sub3Id);
            parameters.Add("@Sub4Id", mdl.Sub4Id);
            parameters.Add("@Sub5Id", mdl.Sub5Id);
            parameters.Add("@Sub1Name", mdl.Sub1Name);
            parameters.Add("@Sub2Name", mdl.Sub2Name);
            parameters.Add("@Sub3Name", mdl.Sub3Name);
            parameters.Add("@Sub4Name", mdl.Sub4Name);
            parameters.Add("@Sub5Name", mdl.Sub5Name);
            DbResponse response = SqlMapper.QuerySingle<DbResponse>(connnString, "SaveSubjects", parameters, commandType: CommandType.StoredProcedure);
            return response;
            connnString.Close();
        }
    }
}


