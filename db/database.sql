create database taskmanager;
use taskmanager;

create table Usuarios (
	id integer primary key auto_increment,
	nome varchar(255) not null,
    email varchar(255) not null unique,
    senha varchar(255) not null
);

create table Listas (
	id integer primary key auto_increment,
    nome varchar(255) not null,
    fk_user int,
    foreign key (fk_user) references Usuarios(id)
);