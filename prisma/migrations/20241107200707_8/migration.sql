/*
  Warnings:

  - Added the required column `orderId` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PlantOrder" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlantOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlantOrder" ADD CONSTRAINT "PlantOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PlantOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
