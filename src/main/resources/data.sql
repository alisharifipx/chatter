CREATE TABLE IF NOT EXISTS APP_USER
(
    id                  BIGSERIAL PRIMARY KEY,
    username            VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    account_expired     BOOLEAN      NOT NULL DEFAULT FALSE,
    account_locked      BOOLEAN      NOT NULL DEFAULT FALSE,
    credentials_expired BOOLEAN      NOT NULL DEFAULT FALSE
);

INSERT INTO APP_USER (username,
                      password,
                      email,
                      enabled,
                      account_expired,
                      account_locked,
                      credentials_expired)
VALUES ('user', '$2a$12$4leyAR.ClA1VZo.k7800NObq8ZRd5L13/5CeotFoHCZ1UH1BqClsa', 'user@fakemail.com', true, false, false,
        false),
       ('jeff', '$2a$12$4leyAR.ClA1VZo.k7800NObq8ZRd5L13/5CeotFoHCZ1UH1BqClsa', 'jeff@fakemail.com', true, false, false,
        false)
ON CONFLICT (username) DO NOTHING; -- TODO: Add Flyway and remove this
