CREATE TABLE IF NOT EXISTS APP_USER
(
    id                  BIGSERIAL PRIMARY KEY,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    account_expired     BOOLEAN      NOT NULL DEFAULT FALSE,
    account_locked      BOOLEAN      NOT NULL DEFAULT FALSE,
    credentials_expired BOOLEAN      NOT NULL DEFAULT FALSE
);

INSERT INTO APP_USER (email,
                      password,
                      first_name,
                      last_name,
                      enabled,
                      account_expired,
                      account_locked,
                      credentials_expired)
VALUES ('jeffd@mail.com', '$2a$12$4leyAR.ClA1VZo.k7800NObq8ZRd5L13/5CeotFoHCZ1UH1BqClsa', 'Jeff', 'Dunham', true,
        false, false,
        false)
ON CONFLICT (email) DO NOTHING; -- TODO: Add Flyway and remove this
