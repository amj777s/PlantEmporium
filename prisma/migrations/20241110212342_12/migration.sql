/*
  Warnings:

  - The primary key for the `plant_orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shopping_carts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "item_orders" DROP CONSTRAINT "item_orders_orderId_fkey";

-- AlterTable
ALTER TABLE "cart_items" ALTER COLUMN "cartId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "item_orders" ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "plant_orders" DROP CONSTRAINT "plant_orders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "plant_orders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "plant_orders_id_seq";

-- AlterTable
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shopping_carts_id_seq";

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "plant_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "shopping_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
