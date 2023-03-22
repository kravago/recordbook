-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

\echo 'Delete and recreate recordbook db?'
\prompt 'Return for yes or control-C to cancel > '

DROP DATABASE recordbook;
CREATE DATABASE recordbook;
\connect recordbook


CREATE TABLE "users" (
    "uid" SERIAL  NOT NULL,
    "first_name" text   NOT NULL,
    "last_name" text   NOT NULL,
    "username" text   NOT NULL,
    "email" text   NOT NULL,
    "password" text   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "uid"
     )
);

CREATE TABLE "records" (
    "uid" int   NOT NULL,
    "anime_id" int   NOT NULL,
    "episodes_watched" int NOT NULL DEFAULT 0 CHECK ("episodes_watched" >= 0) ,
    "score" float CHECK ("score" BETWEEN 0 AND 10),
    CONSTRAINT "pk_records" PRIMARY KEY (
        "uid","anime_id"
     )
);

CREATE TABLE "anime" (
    "anime_id" int   NOT NULL,
    "anime_title" text   NOT NULL,
    "synopsis" text NOT NULL,
    "image" text   NOT NULL,
    "start_date" date   NOT NULL,
    "end_date" date   NOT NULL,
    "rating" float   NOT NULL,
    "status" text   NOT NULL,
    CONSTRAINT "pk_anime" PRIMARY KEY (
        "anime_id"
     )
);

ALTER TABLE "records" ADD CONSTRAINT "fk_records_uid" FOREIGN KEY("uid")
REFERENCES "users" ("uid");

ALTER TABLE "records" ADD CONSTRAINT "fk_records_anime_id" FOREIGN KEY("anime_id")
REFERENCES "anime" ("anime_id");

-- seed some values
INSERT INTO anime (anime_id, 
    anime_title, 
    image, 
    synopsis,
    start_date, 
    end_date, 
    rating, 
    status)
VALUES ( 
    1735, 
    'Naruto: Shippuuden',
    'https://api-cdn.myanimelist.net/images/anime/1565/111305.jpg',
    'It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training 
    following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, 
    is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n \nAlthough Naruto is older 
    and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is 
    now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, 
    Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation 
    of the saga about the boy who wishes to become Hokage.\n\n[Written by MAL Rewrite]',
    '2007-02-15',
    '2017-03-23',
    8.25,
    'finished_airing'
    );

INSERT INTO users ( 
    first_name,
    last_name,
    username,
    email,
    password
) VALUES (
    'test', 'user', 'testuser', 'testuser@gmail.com', 'password'
);
