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

CREATE TABLE FRIENDSHIP
(
    id           BIGSERIAL PRIMARY KEY,
    from_user_id BIGINT NOT NULL,
    to_user_id   BIGINT NOT NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_from_user FOREIGN KEY (from_user_id) REFERENCES APP_USER (id) ON DELETE CASCADE,
    CONSTRAINT fk_to_user FOREIGN KEY (to_user_id) REFERENCES APP_USER (id) ON DELETE CASCADE,
    CONSTRAINT unique_friendship UNIQUE (from_user_id, to_user_id)
);

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_user_search_trgm ON APP_USER
USING gin ((first_name || ' ' || last_name) gin_trgm_ops);

CREATE TABLE CHAT (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CHAT_PARTICIPANT
(
    chat_id BIGINT REFERENCES CHAT(id),
    user_id BIGINT REFERENCES APP_USER(id),
    PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE MESSAGE
(
    id BIGSERIAL PRIMARY KEY,
    chat_id BIGINT REFERENCES CHAT(id),
    sender_id BIGINT REFERENCES APP_USER(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
