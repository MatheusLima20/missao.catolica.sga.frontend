

export const Masks = {

    cpf: (value: string) => {

        var mask = value.replace(/\D/g, "");

        mask = mask.replace(/(\d{3})(\d)/, "$1.$2");

        mask = mask.replace(/(\d{3})(\d)/, "$1.$2");

        mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return mask;

    },

    cnpj: (value: string) => {

        var mask = value.replace(/\D/g, "");

        mask = mask.replace(/^(\d{2})(\d)/, "$1.$2");

        mask = mask.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

        mask = mask.replace(/\.(\d{3})(\d)/, ".$1/$2");

        mask = mask.replace(/(\d{4})(\d)/, "$1-$2");

        return mask;

    },

    cep: (value: string) => {

        var mask = value.replace(/\D/g, "")

        mask = mask.replace(/^(\d{5})(\d)/, "$1-$2")

        return mask;

    },

    phone: (value: string) => {
        var mask = value.replace(/\D/g, "");

        mask = mask.replace(/^(\d\d)(\d)/g, "($1)$2");

        mask = mask.replace(/(\d{5})(\d)/, "$1-$2");

        return mask;
    },

}
