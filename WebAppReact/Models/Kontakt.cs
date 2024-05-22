using System.ComponentModel.DataAnnotations;

namespace WebAppReact.Models
{
    public class Kontakt
    {
        public int Id { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public string Email { get; set; }
        public string Haslo { get; set; }
        public string Kategoria { get; set; }
        public string? Podkategoria { get; set; }
        public long Telefon { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        public DateTime DataUrodzenia { get; set; }

        public Kontakt()
        {

        }
    }
}
