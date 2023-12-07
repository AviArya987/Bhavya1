using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    public class EcomDbContext : DbContext
    {
        public EcomDbContext(DbContextOptions<EcomDbContext> options) : base(options){}
        DbSet<Users> users { get; set; } = null;
        DbSet<Product> Products { get; set; } = null;
    }
}
