create table users (
    user_id serial primary key,
    username varchar(100),
    hash_word text,
    profile_ref text
);

create table table_one(
    one_id serial primary key,
    contents text
);

create table table_to_one(
    one_id serial primary key,
    contents text
);

create table table_to_many(
    one_to_many_id serial primary key,
    one_ref int,
    to_many_contents text
);