CREATE TABLE `N8n` (
                       `id`              VARCHAR(255)                             NOT NULL,
                       `enabled`         TINYINT(1)        NOT NULL DEFAULT 1,
                       `description`     VARCHAR(255)     NULL,
                       `webhookUrl`      VARCHAR(255)     NULL,
                       `basicAuthUser`   VARCHAR(255)     NULL,
                       `basicAuthPass`   VARCHAR(255)     NULL,
                       `expire`          INT               DEFAULT 0,
                       `keywordFinish`   VARCHAR(100)     NULL,
                       `delayMessage`    INT               NULL,
                       `unknownMessage`  VARCHAR(100)     NULL,
                       `listeningFromMe` TINYINT(1)        DEFAULT 0,
                       `stopBotFromMe`   TINYINT(1)        DEFAULT 0,
                       `keepOpen`        TINYINT(1)        DEFAULT 0,
                       `debounceTime`    INT               NULL,
                       `ignoreJids`      JSON              NULL,
                       `splitMessages`   TINYINT(1)        DEFAULT 0,
                       `timePerChar`     INT               DEFAULT 50,
                       `triggerType`     ENUM('all','keyword','none','advanced')      NULL,
                       `triggerOperator` ENUM('contains','equals','startsWith','endsWith','regex') NULL,
                       `triggerValue`    TEXT              NULL,
                       `createdAt`       TIMESTAMP         NULL    DEFAULT CURRENT_TIMESTAMP,
                       `updatedAt`       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       `instanceId`      VARCHAR(255)      NOT NULL,

                       PRIMARY KEY (`id`),
                       UNIQUE KEY `N8n_instanceId_key` (`instanceId`),
                       CONSTRAINT `N8n_instanceId_fkey`
                           FOREIGN KEY (`instanceId`) REFERENCES `Instance`(`id`)
                               ON DELETE CASCADE
                               ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `N8nSetting` (
                              `id`              VARCHAR(255)    NOT NULL,
                              `expire`          INT              DEFAULT 0,
                              `keywordFinish`   VARCHAR(100)    NULL,
                              `delayMessage`    INT              NULL,
                              `unknownMessage`  VARCHAR(100)    NULL,
                              `listeningFromMe` TINYINT(1)       DEFAULT 0,
                              `stopBotFromMe`   TINYINT(1)       DEFAULT 0,
                              `keepOpen`        TINYINT(1)       DEFAULT 0,
                              `debounceTime`    INT              NULL,
                              `ignoreJids`      JSON             NULL,
                              `splitMessages`   TINYINT(1)       DEFAULT 0,
                              `timePerChar`     INT              DEFAULT 50,
                              `createdAt`       TIMESTAMP        NULL    DEFAULT CURRENT_TIMESTAMP,
                              `updatedAt`       TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              `n8nIdFallback`   VARCHAR(255)     NULL,
                              `instanceId`      VARCHAR(255)     NOT NULL,

                              PRIMARY KEY (`id`),
                              UNIQUE KEY `N8nSetting_instanceId_key` (`instanceId`),
                              CONSTRAINT `N8nSetting_n8nIdFallback_fkey`
                                  FOREIGN KEY (`n8nIdFallback`) REFERENCES `N8n`(`id`)
                                      ON DELETE SET NULL
                                      ON UPDATE CASCADE,
                              CONSTRAINT `N8nSetting_instanceId_fkey`
                                  FOREIGN KEY (`instanceId`) REFERENCES `Instance`(`id`)
                                      ON DELETE CASCADE
                                      ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
