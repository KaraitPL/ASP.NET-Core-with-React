﻿using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebAppReact.Models;

namespace WebAppReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Kontakt> Kontakty { get; set; }
        public DbSet<Kategoria> Kategorie { get; set; }
        public DbSet<Podkategoria> Podkategorie { get; set; }
    }
}