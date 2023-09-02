const buscar = document.getElementById('buscar');
const resultadoPokemon = document.getElementById('resultado');

buscar.addEventListener('click', function () {
    const nombre = document.getElementById('inputPokemon').value.toLowerCase();
    if (nombre == '') {
        return console.log('Nombre vacio');
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=40`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const resultados = data.results.filter(function (pokemon) {
                return pokemon.name.includes(nombre);

            });

            let resultadosHTML = ' <h2>Resultado de la busqueda</h2>';

            resultados.forEach(function (pokemon) {
                fetch(pokemon.url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (pokemonImg) {
                        resultadosHTML += `
                            <div class="col-md-3">
                                <div class="card">
                                  <img src="pokebola.png" width="50" style="margin-top:-20px; margin-left:-5px;">
                                    <img src="${pokemonImg.sprites.other.home.front_default}" width="50" class="card-img-top" alt="${pokemon.name} width=100px">
                                    <div class="card-body" style="margin-top:20px;">
                                        <h5 class="card-title text-center">${pokemon.name.toUpperCase()}</h5>
                                    </div>
                                </div>
                            </div>`;
                        resultadoPokemon.innerHTML = resultadosHTML;
                    });
            });
        })
        .catch(function (error) {
            console.error('Ocurrio un error:', error.message);
        });
});