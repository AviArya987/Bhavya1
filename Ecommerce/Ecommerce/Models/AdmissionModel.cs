using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Ecommerce.Models
{
    public class AdmissionDetailModel
    {
        public int Id { get; set; }
        public string Plan_Name { get; set; }
        public int Plan_Amount { get; set; }
        public List<AdmissionComponentModel> lstcomp { get; set; }
        public string Created_Date { get; set; }
    }


    public class AdmissionComponentModel
    {
        public int Id { get; set; }
        public int MainAttributeId { get; set; }
        public string MainAttribute { get; set; }
        public int SubAttributeId { get; set; }
        public string SubAttribute { get; set; }
        public int Amount { get; set; }
        public int AdmissionId { get; set; }
        public string Created_Date { get; set; }
    }

    public class BALAdmission
    {
        public DbResponse InsertUpdtAdmission(SqlConnection connnString, AdmissionDetailModel mdl)
        {
            connnString.Open();
            var parameters = new DynamicParameters();
            parameters.Add("@Id", mdl.Id);
            parameters.Add("@PlanName", mdl.Plan_Name);
            parameters.Add("@PlanAmount", mdl.Plan_Amount);
            DbResponse response = SqlMapper.QuerySingle<DbResponse>(connnString, "SaveAdmissionDetail", parameters, commandType: CommandType.StoredProcedure);
            foreach(var item in mdl.lstcomp)
            {
                var parameters1 = new DynamicParameters();
                parameters1.Add("@Id", item.Id);
                parameters1.Add("@MainAttributeId", item.MainAttributeId); 
                parameters1.Add("@MainAttribute", item.MainAttribute);
                parameters1.Add("@SubAttribute", item.SubAttribute);
                parameters1.Add("@SubAttributeId", item.SubAttributeId);
                parameters1.Add("@Amount", item.Amount);
                parameters1.Add("@AdmissionId", mdl.Id);
                DbResponse resp = SqlMapper.QuerySingle<DbResponse>(connnString, "SaveAdmissionComponent", parameters1, commandType: CommandType.StoredProcedure);
            }
            return response;
            connnString.Close();
        }
    }

}


