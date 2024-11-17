/*
  Warnings:

  - You are about to drop the column `orderId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the `PlantOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlantOrder" DROP CONSTRAINT "PlantOrder_userId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "plant_reviews" DROP CONSTRAINT "plant_reviews_userId_fkey";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "plant_reviews" ALTER COLUMN "userId" SET DEFAULT 'anonymous';

-- DropTable
DROP TABLE "PlantOrder";

-- CreateTable
CREATE TABLE "plant_orders" (
    "id" SERIAL NOT NULL,
    "userId" TEXT DEFAULT 'anonymous',
    "addressId" INTEGER NOT NULL DEFAULT 999999999999,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plant_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_orders" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plant_reviews" ADD CONSTRAINT "plant_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_orders" ADD CONSTRAINT "plant_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_orders" ADD CONSTRAINT "plant_orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "plant_shipping_addresses"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "plant_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "plant_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
