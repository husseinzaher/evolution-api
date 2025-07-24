/*
  Warnings:

  - A unique constraint covering the columns `[remoteJid,instanceId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
*/

SELECT COUNT(*)
INTO @col_exists
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND table_name   = 'Setting'
  AND column_name  = 'wavoipToken';

SET @ddl = IF(
  @col_exists = 0,
  'ALTER TABLE `Setting` ADD COLUMN `wavoipToken` VARCHAR(100);',
  'SELECT ''Column already exists'';'
);

PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
