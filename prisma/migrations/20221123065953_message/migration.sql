-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
