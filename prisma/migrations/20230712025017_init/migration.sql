-- CreateTable
CREATE TABLE "Pool" (
    "pool" TEXT NOT NULL,
    "token0" TEXT NOT NULL,
    "token1" TEXT NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("pool")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_pool_key" ON "Pool"("pool");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_token0_key" ON "Pool"("token0");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_token1_key" ON "Pool"("token1");
