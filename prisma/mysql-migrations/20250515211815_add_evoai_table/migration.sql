CREATE TABLE `Evoai` (
                         `id`              VARCHAR(255)                             NOT NULL,
                         `enabled`         TINYINT(1)        NOT NULL DEFAULT 1,
                         `description`     VARCHAR(255)     NULL,
                         `agentUrl`        VARCHAR(255)     NULL,
                         `apiKey`          VARCHAR(255)     NULL,
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
                         UNIQUE KEY `Evoai_instanceId_key` (`instanceId`),
                         CONSTRAINT `Evoai_instanceId_fkey`
                             FOREIGN KEY (`instanceId`) REFERENCES `Instance`(`id`)
                                 ON DELETE CASCADE
                                 ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;


CREATE TABLE `EvoaiSetting` (
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
                                `evoaiIdFallback` VARCHAR(255)     NULL,
                                `instanceId`      VARCHAR(255)     NOT NULL,

                                PRIMARY KEY (`id`),
                                UNIQUE KEY `EvoaiSetting_instanceId_key` (`instanceId`),
                                CONSTRAINT `EvoaiSetting_evoaiIdFallback_fkey`
                                    FOREIGN KEY (`evoaiIdFallback`) REFERENCES `Evoai`(`id`)
                                        ON DELETE SET NULL
                                        ON UPDATE CASCADE,
                                CONSTRAINT `EvoaiSetting_instanceId_fkey`
                                    FOREIGN KEY (`instanceId`) REFERENCES `Instance`(`id`)
                                        ON DELETE CASCADE
                                        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
