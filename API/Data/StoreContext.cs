using System;
using Microsoft.EntityFrameworkCore;

public class StoreContext : DbContext
{
	public StoreContext(DbContextOptions options) : base(options)
	{

	}

	public DbSet<Product> Products { get; set; }

	public DbSet<Basket> Baskets { get; set; }
}
