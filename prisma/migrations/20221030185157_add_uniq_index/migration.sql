/*
  Warnings:

  - A unique constraint covering the columns `[time,cityId]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Weather_time_cityId_key` ON `Weather`(`time`, `cityId`);
