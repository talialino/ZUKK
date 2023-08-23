const { PrismaClient } = require('@prisma/client');

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



        // const selectConflict = await readingUser.findIndex(
        //     (position) => position.nome === nome || position.email === email
        // );
        try {
            // if (readingUser[selectConflict]) {
            //     return res
            //         .status(409)
            //         .send({ Error: 'Name or Email already exist.' });
            // }

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
            res.status(404).send('Não foi criado');
        }
        return res;
    },
    async read(req, res) {
        try {

            const produtores = await prisma.produtor.findMany()
            return res.status(201).json(produtores);

        } catch (error) {
            console.log(error)
            res.status(404).send('Vazio');
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

        const cpfBackup = cpf_cnpj;

        try {

            if(!id){
                res.status(404).json('Id é obrigatório');
            }
            
            const produtorExiste = await prisma.produtor.findUnique({ where: { id } });

            if(!produtorExiste){
                res.status(404).json('Produtor não existe');
            }
            
            const produtor = await prisma.produtor.update({
                where: { id },
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

            console.log(produtor.cpf_cnpj)

            return res.status(201).json(produtor);

        } catch (error) {
            console.log(error)
            res.status(404).send('Não atualizado');
        }
    },
    async delete(req, res) {
        try {

            const { id } = req.params;

            const idInt = parseInt(id);

            if(!idInt){
                res.status(404).json('Id é obrigatório');
            }
            
            const produtorExiste = await prisma.produtor.findUnique({ where: { id: idInt } });

            if(!produtorExiste){
                res.status(404).json('Produtor não existe');
            }

            await prisma.produtor.delete({ where: { id: idInt } })
            return res.status(200).json('Produtor deletado');

        } catch (error) {
            console.log(error)
            res.status(404).send('Não deletado');
        }
    },


};
