create table movies(
    id serial primary key,
    nome varchar(50) not null,
    category varchar(50) not null,
    duration integer not null,
    price integer not null
);
