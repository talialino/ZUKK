const fs = require('fs');

const readUser = () => {
    const content = fs.readFileSync('./src/models/user.json', 'utf-8');
    return JSON.parse(content);
};

const readFila = () => {
    const content = fs.readFileSync('./src/models/fila.json', 'utf-8');
    return JSON.parse(content);
};

const writeFila = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./src//models/fila.json', updateFile, 'utf-8');
};

module.exports = {
    async adding(req, res) {
        const { id } = req.params;

        const readingUser = readUser();

        const readingFila = readFila();

        const selectId = await readingUser.findIndex((cod) => cod.id === id);

        try {
            const { nome, email, genero } = readingUser[selectId];

            const selectConflict = await readingFila.findIndex(
                (position) => position.nome === nome || position.email === email
            );

            if (readingFila[selectConflict]) {
                return res.status(409).send({ Error: 'User already exist.' });
            }

            readingFila.push({ nome, email, genero });

            writeFila(readingFila);

            const selectData = await readingFila.findIndex(
                (position) => position.nome === nome
            );

            const resul = {
                'Usuário adicionado com sucesso na fila!': {
                    Posição: readingFila.indexOf(readingFila[selectData]),
                },
            };

            res.status(200).send(resul);
        } catch (err) {
            res.status(304).send(err, 'User not exist');
        }
        return res;
    },
    async find(req, res) {
        const { email } = req.params;

        const readingFila = readFila();

        const selectEmail = readingFila.findIndex(
            (posicao) => posicao.email === email
        );
        try {
            if (!readingFila[selectEmail]) {
                return res.status(409).send({ Error: 'Email not exist.' });
            }

            const resul = {
                'Posição na fila do usuário com este email:': {
                    Número: readingFila.indexOf(readingFila[selectEmail]),
                },
            };

            res.status(302).send(resul);
        } catch (err) {
            res.status(404).send(err, 'Not find');
        }
        return res;
    },
    async show(req, res) {
        const readingFila = readFila();

        try {
            const resul = {
                Fila: readingFila.map((valor) => {
                    return {
                        Posição: readingFila.indexOf(valor),
                        Nome: valor.nome,
                        Gênero: valor.genero,
                        Email: valor.email,
                    };
                }),
            };
            res.status(302).send(resul);
        } catch (err) {
            res.status(404).send(err, 'Not find');
        }
    },
    async filter(req, res) {
        const { genero } = req.params;

        const readingFila = readFila();

        const selectGenero = readingFila.filter(
            (sexo) => sexo.genero === genero
        );

        const selectConflict = selectGenero.findIndex(
            (data) => data.genero === genero
        );

        try {
            if (!readingFila[selectConflict]) {
                return res.status(409).send({ Error: 'edit genere.' });
            }
            const resul = {
                Dados: selectGenero.map((valor) => {
                    return {
                        Posição: readingFila.indexOf(valor),
                        Nome: valor.nome,
                        Gênero: valor.genero,
                        Email: valor.email,
                    };
                }),
            };

            res.status(302).send(resul);
        } catch (err) {
            res.status(404).send(err, 'Not find');
        }
        return res;
    },
    async exit(req, res) {
        const readingFila = readFila();

        try {
            const resul = readingFila.shift();

            writeFila(readingFila);

            res.status(200).send({ 'Você removeu': resul });
        } catch (err) {
            res.status(404).send(err, 'Don´t was deleted');
        }
    },
};
