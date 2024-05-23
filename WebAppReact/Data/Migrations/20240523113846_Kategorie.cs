using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAppReact.Data.Migrations
{
    public partial class Kategorie : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Kontakt",
                table: "Kontakt");

            migrationBuilder.RenameTable(
                name: "Kontakt",
                newName: "Kontakty");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kontakty",
                table: "Kontakty",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Kontakty",
                table: "Kontakty");

            migrationBuilder.RenameTable(
                name: "Kontakty",
                newName: "Kontakt");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kontakt",
                table: "Kontakt",
                column: "Id");
        }
    }
}
