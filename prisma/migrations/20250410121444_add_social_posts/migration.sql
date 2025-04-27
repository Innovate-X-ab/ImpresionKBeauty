-- CreateTable
CREATE TABLE `SocialPost` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `mediaUrl` TEXT NOT NULL,
    `thumbnailUrl` TEXT NULL,
    `mediaType` VARCHAR(191) NOT NULL,
    `caption` TEXT NOT NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `externalUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
