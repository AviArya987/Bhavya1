using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Ecommerce.Models
{
    public class ProductPermission
    {
        public IList<Product> lstproducts { get; set; }
        public IList<Product> GetAllProducts(SqlConnection connnString)
        {
            connnString.Open();
            var parameters = new DynamicParameters();
            var lstproducts = SqlMapper.Query<Product>(connnString, "GetProducts", parameters, commandType:CommandType.StoredProcedure);
            return lstproducts.ToList();
            connnString.Close();
        }

    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProductId { get; set; } = Guid.NewGuid().ToString();  
        public string Price { get; set; }
        public string Discount { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }

    }
}
