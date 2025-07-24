ALTER TABLE `Typebot`
    ADD COLUMN `splitMessages` TINYINT(1) DEFAULT 0,
  ADD COLUMN `timePerChar`    INT        DEFAULT 50;

ALTER TABLE `TypebotSetting`
    ADD COLUMN `splitMessages` TINYINT(1) DEFAULT 0,
  ADD COLUMN `timePerChar`    INT        DEFAULT 50;
