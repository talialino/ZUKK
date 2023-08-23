-- CreateTable
CREATE TABLE "produtor" (
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

    CONSTRAINT "produtor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtor_cpf_cnpj_key" ON "produtor"("cpf_cnpj");
