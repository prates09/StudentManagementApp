using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Data
{
    public class StudentDbContext : IdentityDbContext<ApplicationUser>
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; } = null!;

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<Student>().HasData(
        //        new Student {  Name = "Rahul", Class = "10", Section = "A" },
        //        new Student {  Name = "Ananya", Class = "9", Section = "B" },
        //        new Student {  Name = "Amit", Class = "8", Section = "A" }
        //    );
        //}
    }
}
