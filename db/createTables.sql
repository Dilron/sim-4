create table users (
    user_id serial primary key,
    username varchar(100),
    hash_word text,
    profile_ref text
);

