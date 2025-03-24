using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core
{
    public static class DefaultDataSeeding
    {
        public static void SeedDefaultData(ModelBuilder builder)
        {
            //AddWarranties(builder);

        }
        public static void AddDefaultCurrencies(ModelBuilder builder)
        {
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "AUD", IsEnable = true, SymbolIcon = "&#36;", Id = 1 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "NZD", IsEnable = true, SymbolIcon = "&#36;", Id = 2 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "SGD", IsEnable = true, SymbolIcon = "&#36;", Id = 3 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "RM", IsEnable = true, SymbolIcon = "", Id = 4 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "HK", IsEnable = true, SymbolIcon = "&#36;", Id = 5 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "INR", IsEnable = true, SymbolIcon = "", Id = 6 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Thai Bhat", IsEnable = true, SymbolIcon = "&#3647;", Id = 7 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Indonesia Rupiah", IsEnable = true, SymbolIcon = "&#82;&#112;", Id = 8 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "PHP Peso", IsEnable = true, SymbolIcon = "&#8369;", Id = 9 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Euro", IsEnable = true, SymbolIcon = "&#8364;", Id = 10 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Canadian$", IsEnable = true, SymbolIcon = "&#36;", Id = 11 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = " Japanese Yen", IsEnable = true, SymbolIcon = "&#165;", Id = 12 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "British Pound", IsEnable = true, SymbolIcon = "&#163;", Id = 13 });


        }
    }
}
