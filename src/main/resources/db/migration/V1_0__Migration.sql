CREATE TABLE APP_USER
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
