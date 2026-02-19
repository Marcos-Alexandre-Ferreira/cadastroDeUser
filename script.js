const botaoSave = document.getElementById("botaoSave");
const form = document.querySelector('form');

botaoSave.addEventListener("click", e => {

    e.preventDefault();

    // 1) coleta os valores
    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        cep: form.cep.value,
        logradouro: form.logradouro.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        numero: form.numero.value
    };

    // 2) converte para string JSON
    localStorage.setItem('usuario', JSON.stringify(dados));

    alert('Dados salvos!');
});

// Recuperar mais tarde (por exemplo, ao carregar a página)
window.addEventListener('load', () => {
    const texto = localStorage.getItem('usuario');

    if (texto) {
        const usuario = JSON.parse(texto);            // 3) volta a ser objeto
        // preencher o formulário com os dados salvos
        form.nome.value = usuario.nome || '';
        form.email.value = usuario.email || '';
        form.telefone.value = usuario.telefone || '';
        form.cep.value = usuario.cep || '';
        form.logradouro.value = usuario.logradouro || '';
        form.bairro.value = usuario.bairro || '';
        form.cidade.value = usuario.cidade || '';
        form.estado.value = usuario.estado || '';
        form.numero.value = usuario.numero || '';

        // logs para debugging opcional
        console.log('recuperado', usuario);
    }
});

//Ouvir elemento quando o usuário sair do campo CEP
    document.getElementById('cep').addEventListener('blur', (evento) => { 
        const elemento = evento.target;
        const cepInformado = elemento.value;

        //Verificar se o CEP tem 8 dígitos
        if(!(cepInformado.length === 8))
            return; 
        //Fazer a requisição para a API do ViaCEP
        //Promessa de que o Fetch vai buscar esse recurso
        fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        //Promessa de que a resposta da API vai ser convertida para JSON
        .then(resposta => resposta.json())
        //Promessa de que o resultado do JSON vai ser usado para preencher os campos
        .then(data => {
            //Processamento da página
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.error ("Erro ao buscar o CEP", error));                         
    });
