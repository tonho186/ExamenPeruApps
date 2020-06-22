﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using reactiveFormWeb.Models;

namespace reactiveFormWeb.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200621054146_Eventos")]
    partial class Eventos
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("reactiveFormWeb.Models.Complejo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Area");

                    b.Property<string>("Jefe");

                    b.Property<string>("Localizacion");

                    b.HasKey("Id");

                    b.ToTable("Complejos");
                });

            modelBuilder.Entity("reactiveFormWeb.Models.Evento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ComplejoId");

                    b.Property<string>("Duracion");

                    b.Property<DateTime>("Fecha");

                    b.Property<int>("NumComisarios");

                    b.Property<int>("NumParticipantes");

                    b.HasKey("Id");

                    b.HasIndex("ComplejoId");

                    b.ToTable("Evento");
                });

            modelBuilder.Entity("reactiveFormWeb.Models.Evento", b =>
                {
                    b.HasOne("reactiveFormWeb.Models.Complejo")
                        .WithMany("Eventos")
                        .HasForeignKey("ComplejoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
