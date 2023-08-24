const { PrismaClient } = require('@prisma/client');
const {validarDigitos, validarCnpj, validarCpf} = require('../functions/validacaoCpfCnpj');

const prisma = new PrismaClient();

module.exports = {
    async create(req, res) {
        const {
            cpf_cnpj,
            nome_produtor,
            nome_fazenda,
            cidade,
            estado,
            area_total_fazenda,
            area_agricultavel,
            area_vegetacao,
            culturas
        } = req.body;

        const cpfCnpjExist = await prisma.produtor.findUnique({ where: { cpf_cnpj } });

        if ((cpfCnpjExist) || (validarDigitos(cpf_cnpj))) {
            return res.status(409).json('CPF ou CNPJ já existe ou foi digitado incorretamente!');
        }

        if ((cpf_cnpj.length == 11) && (!validarCpf(cpf_cnpj))) {

            return res.status(404).json('CPF não existe! Cadastro não realizado.');
           

        } else if ((cpf_cnpj.length) == 14 && (!validarCnpj(cpf_cnpj))) {

            return res.status(404).json('CNPJ não existe! Cadastro não realizado.');
        }

        const somaArea = area_agricultavel + area_vegetacao;

        if(somaArea > area_total_fazenda){
            return res.status(409).json('Não cadastrado! Valores de áreas incorretos.');
        }

        try {
            const produtor = await prisma.produtor.create({
                data: {
                    cpf_cnpj,
                    nome_produtor,
                    nome_fazenda,
                    cidade,
                    estado,
                    area_total_fazenda,
                    area_agricultavel,
                    area_vegetacao,
                    culturas
                },
            });

            return res.status(201).json(produtor);
        } catch (error) {
            console.log(error)
            return res.status(404).send('Não foi criado');
        }
    },
    async read(req, res) {
        try {
            const produtores = await prisma.produtor.findMany()
            return res.status(201).json(produtores);

        } catch (error) {
            console.log(error)
            return res.status(404).send('Vazio');
        }
    },
    async update(req, res) {

        const {
            id,
            cpf_cnpj,
            nome_produtor,
            nome_fazenda,
            cidade,
            estado,
            area_total_fazenda,
            area_agricultavel,
            area_vegetacao,
            culturas
        } = req.body;

        try {

            if (!cpf_cnpj) {
                return res.status(409).json('Informe CPF ou CNPJ para alteração.');
            }

            const produtorExiste = await prisma.produtor.findUnique({ where: { cpf_cnpj } });

            if (!produtorExiste) {
                return res.status(404).json('Produtor não existe');
            }

            const produtor = await prisma.produtor.update({
                where: { cpf_cnpj },
                data: {
                    id,
                    nome_produtor,
                    nome_fazenda,
                    cidade,
                    estado,
                    area_total_fazenda,
                    area_agricultavel,
                    area_vegetacao,
                    culturas
                },
            });

            return res.status(201).json(produtor);

        } catch (error) {
            console.log(error)
            return res.status(404).send('Não atualizado');
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const idInt = parseInt(id);

            if (!idInt) {
                return res.status(409).json('Id é obrigatório');
            }

            const produtorExiste = await prisma.produtor.findUnique({ where: { id: idInt } });

            if (!produtorExiste) {
                return res.status(404).json('Produtor não existe');
            }

            await prisma.produtor.delete({ where: { id: idInt } })
            return res.status(200).json('Produtor deletado');

        } catch (error) {
            console.log(error)
            return res.status(404).send('Não deletado');
        }
    },
    async dashboard(req,res) {
        try {
            const total_fazendas = await prisma.produtor.count();
            const total_area_fazendas = await prisma.produtor.aggregate({
              _sum: {
                area_total_fazenda: true,
              },
            });
        
            const estados_data = await prisma.produtor.groupBy({
              by: ['estado'],
              _count: {
                estado: true,
              },
            });
        
            const culturas_data = await prisma.produtor.groupBy({
              by: ['culturas'],
              _count: {
                culturas: true,
              },
            });
        
            const areaAgricultavelVegetacao = await prisma.produtor.aggregate({
              _sum: {
                area_agricultavel: true,
                area_vegetacao: true,
              },
            });
        
            return res.status(200).json({
              total_fazendas,
              total_area_fazendas: total_area_fazendas._sum.area_total_fazenda,
              estados_data,
              culturas_data,
              area_agricultavel: areaAgricultavelVegetacao._sum.area_agricultavel,
              area_vegetacao: areaAgricultavelVegetacao._sum.area_vegetacao,
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar dados para o dashboard.' });
          }
    }
};
