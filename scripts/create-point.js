//função para retornar os estados
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        });
}
//chamada da função de estados
populateUFs();

//função de retorno da cidade conforme ID do estado
function getCities(event) {
    //pegamendo o elemento select do HTML
    const citySelect = document.querySelector("[name=city]");
    //pegando o retorno no nome do estado pelo input que esta escondido no html
    const stateInput = document.querySelector("[name=state]");

    //pegando o valor(target.value) do evento change onde getCities está sendo ouvido
    const ufValue = event.target.value;

    //retornando o valor da posicao do array de todos os options de forma dinamica
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text

    //api de retorno da cidades recebendo o valor da uf escolhida anteriormente
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }

            //des-habilitando o disabled do select
            citySelect.disabled = false;
        });
}

//retorno da função de cidades para o select
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);