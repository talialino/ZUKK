

const validacao = {

    validarDigitos(cpf_cnpj) {

        if (cpf_cnpj == "00000000000" || cpf_cnpj == "11111111111" || cpf_cnpj == "22222222222" ||
            cpf_cnpj == "33333333333" || cpf_cnpj == "44444444444" || cpf_cnpj == "55555555555" ||
            cpf_cnpj == "66666666666" || cpf_cnpj == "77777777777" || cpf_cnpj == "88888888888" ||
            cpf_cnpj == "99999999999" || cpf_cnpj == "01234567890" || cpf_cnpj.length < 11    || 
            (cpf_cnpj.length > 11 && cpf_cnpj.length < 14) || cpf_cnpj.length > 14) {

            return true;
        }

        return false;
    },

    verificarDigitos(cpf_cnpj, n) {

        let soma = 0;

        for (let i = 0; i < n; i++) {
            soma += parseInt(cpf_cnpj.charAt(i)) * (10 - i);
        }

        let resto = 11 - (soma % 11);

        if (resto == 10 || resto == 11) resto = 0;

        return resto;

    },

    validarCpf(cpf_cnpj) {

        let primeiroDigito = validacao.verificarDigitos(cpf_cnpj, 9)
        let segundoDigito = validacao.verificarDigitos(cpf_cnpj, 10)

        if ((primeiroDigito !== parseInt(cpf_cnpj.charAt(9))) &&
            segundoDigito !== parseInt(cpf_cnpj.charAt(10))) {

            return false;
        }

        return true;
    },

    validarCnpj(cpf_cnpj) {

        let j = 5;
        let k = 6;
        let somaDigito1 = "";
        let somaDigito2 = "";

        for (let i = 0; i < 13; i++) {
            j = j == 1 ? 9 : j;
            k = k == 1 ? 9 : k;
            somaDigito2 += (parseInt(cpf_cnpj.charAt(i)) * k);
            if (i < 12) {
                somaDigito1 += (parseInt(cpf_cnpj.charAt(i)) * j);
            }
            k--;
            j--;
        }
        let primeiroDigito = somaDigito1 % 11 < 2 ? 0 : 11 - somaDigito1 % 11;
        let segundoDigito2 = somaDigito2 % 11 < 2 ? 0 : 11 - somaDigito2 % 11;

         
        if((primeiroDigito !== parseInt(cpf_cnpj.charAt(12))) && 
        (segundoDigito2 !== parseInt(cpf_cnpj.charAt(13)))){
            
            return false;
        };

        return true;
    }

}

module.exports = validacao;