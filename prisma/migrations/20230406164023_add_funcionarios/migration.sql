-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sac" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "pdv" TEXT NOT NULL,
    "processoConcluido" BOOLEAN NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);
