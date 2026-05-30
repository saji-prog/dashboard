-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "areaHa" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "areaHa" REAL NOT NULL,
    "health" INTEGER NOT NULL,
    "soilMoisture" INTEGER NOT NULL,
    "soilPh" REAL NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "ndvi" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Field_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fieldId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timeLabel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Alert_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorReading" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timeLabel" TEXT NOT NULL,
    "moisture" INTEGER NOT NULL,
    "temp" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "YieldForecast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "predicted" INTEGER NOT NULL,
    "actual" INTEGER
);

-- CreateTable
CREATE TABLE "WeatherForecast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "rain" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YieldForecast_day_key" ON "YieldForecast"("day");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherForecast_day_key" ON "WeatherForecast"("day");
