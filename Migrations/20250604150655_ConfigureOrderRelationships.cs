using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShepherdsPies.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureOrderRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_DelivererId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_OrderTakerId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dee5393e-6883-41f9-85dc-3e28bff1695a", "AQAAAAIAAYagAAAAEBaG/ot5+uyfEjCasLpkk1bBqU23HJMy+cHDwZs544w/IUrVmb+P0qgc2jjfJjMhEg==", "9d176dec-d97a-483c-ae38-ec5f4edafdf3" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 4, 15, 6, 54, 536, DateTimeKind.Utc).AddTicks(6046));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 3, 15, 6, 54, 536, DateTimeKind.Utc).AddTicks(6062));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 15, 6, 54, 536, DateTimeKind.Utc).AddTicks(6073));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 25, 15, 6, 54, 536, DateTimeKind.Utc).AddTicks(6075));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 5, 15, 6, 54, 536, DateTimeKind.Utc).AddTicks(6077));

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_UserProfiles_DelivererId",
                table: "Orders",
                column: "DelivererId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_UserProfiles_OrderTakerId",
                table: "Orders",
                column: "OrderTakerId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UserProfiles_DelivererId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UserProfiles_OrderTakerId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "93b3c6aa-eec6-43d0-9b88-91e5204c2f0d", "AQAAAAIAAYagAAAAEMWA12GUyTgLudCNVYEN0gBakz2w9nSN6W5kmSg64kiiShxcjaXIXO9zY4cR/5pYew==", "5c8d7457-3436-4589-9a59-9c94b805869e" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 4, 14, 40, 12, 563, DateTimeKind.Utc).AddTicks(4375));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 3, 14, 40, 12, 563, DateTimeKind.Utc).AddTicks(4383));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 40, 12, 563, DateTimeKind.Utc).AddTicks(4391));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 25, 14, 40, 12, 563, DateTimeKind.Utc).AddTicks(4393));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 5, 14, 40, 12, 563, DateTimeKind.Utc).AddTicks(4395));

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_DelivererId",
                table: "Orders",
                column: "DelivererId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_OrderTakerId",
                table: "Orders",
                column: "OrderTakerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
