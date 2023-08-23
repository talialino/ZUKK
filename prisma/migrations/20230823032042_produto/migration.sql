-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "nome_produtor" TEXT,
    "nome_fazenda" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "area_total_fazenda" DOUBLE PRECISION NOT NULL,
    "area_agricultavel" DOUBLE PRECISION NOT NULL,
    "area_vegetacao" DOUBLE PRECISION NOT NULL,
    "culturas" TEXT[],

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_cpf_cnpj_key" ON "produto"("cpf_cnpj");
