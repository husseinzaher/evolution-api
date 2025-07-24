CREATE TABLE `Nats` (
                        `id`          VARCHAR(255)       NOT NULL,
                        `enabled`     TINYINT(1)         NOT NULL DEFAULT 0,
                        `events`      JSON               NOT NULL,
                        `createdAt`   TIMESTAMP          NULL    DEFAULT CURRENT_TIMESTAMP,
                        `updatedAt`   TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        `instanceId`  VARCHAR(255)       NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `Nats_instanceId_key` (`instanceId`),
                        CONSTRAINT `Nats_instanceId_fkey`
                            FOREIGN KEY (`instanceId`)
                                REFERENCES `Instance` (`id`)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
