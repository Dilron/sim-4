insert into users (username, hash_word, profile_ref)
values(
    ${username},
    ${hash},
    ${profileRef}
)returning user_id, profile_ref;