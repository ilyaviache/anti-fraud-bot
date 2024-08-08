-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "firstname" TEXT,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chatId_key" ON "User"("chatId");

-- CreateIndex
CREATE INDEX "User_chatId_idx" ON "User"("chatId");
