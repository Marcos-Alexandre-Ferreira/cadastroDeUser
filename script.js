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
})           