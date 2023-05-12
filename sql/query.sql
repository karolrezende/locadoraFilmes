insert into movies(nome, category,duration, price)
values ('matrix', 'sci-fi', 168, 25),
        ('deu a louca', 'comedia', 220, 10),
        ('zumbilandia', 'drama', 126, 15),
        ('todo mundo em panico', 'comedia', 163, 15);

select * from movies;

select * from movies where id = 1;

delete from movies where id = 1;