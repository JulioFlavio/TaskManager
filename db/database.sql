create database taskmanager;
use taskmanager;

create table Usuarios (
	id integer primary key auto_increment,
	nome varchar(255) not null,
    email varchar(255) not null unique,
    senha varchar(255) not null
);

create table Tarefas (
	id integer primary key auto_increment,
    nome varchar(255) not null,
    descricao varchar(255),
    id_user int,
    foreign key (id_user) references Usuarios(id)
);

DELIMITER $$

    CREATE TRIGGER set_data_criacao
    BEFORE INSERT ON Tarefas
    FOR EACH ROW
    BEGIN
    SET NEW.data_criacao = CURDATE();
    END$$

DELIMITER ;