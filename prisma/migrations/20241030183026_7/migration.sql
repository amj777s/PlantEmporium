/*
  Warnings:

  - You are about to drop the `plant_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "plant_reviews" DROP CONSTRAINT "plant_reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "plant_shipping_addresses" DROP CONSTRAINT "plant_shipping_addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_user_id_fkey";

-- AlterTable
ALTER TABLE "plant_reviews" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "plant_shipping_addresses" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "shopping_carts" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "plant_users";

-- AddForeignKey
ALTER TABLE "plant_shipping_addresses" ADD CONSTRAINT "plant_shipping_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_reviews" ADD CONSTRAINT "plant_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
