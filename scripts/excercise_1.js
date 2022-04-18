
// references
const poke_id = document.getElementById('poke_id');
const poke_names = document.getElementById('poke_names');
const poke_types = document.getElementById('poke_types');

// Functions definition

const randomArray = (length, max) => 
  Array(length).fill().map(() => Math.round(Math.random() * max))

const fetchPokemon = (ids_array) =>{
    const promises = [];
    for (const pokemon_id of ids_array) {
        const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
        promises.push(fetch(pokemon_url).then((res) => res.json()));
    }
    Promise.all(promises).then((results)=>{
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            types: data.types.map(type => type.type.name).join(' , ')
        }));
        displayPokemonNames(pokemon)
        displayPokemonIDs(pokemon)
        displayPokemonTypes(pokemon)
    });
}

const displayPokemonNames = (pokemon) => {
    const pokemonHTMLstringl = pokemon.map((pokemon) =>`
    <li><p>${pokemon.name}</p></li>`
    ).join('');
    poke_names.innerHTML = pokemonHTMLstringl;
    console.log(pokemonHTMLstringl)
}

const displayPokemonIDs = (pokemon) => {
    const pokemonHTMLstringl = pokemon.map((pokemon) =>`
    <li><p>${pokemon.id}</p></li>`
    ).join('');
    poke_id.innerHTML = pokemonHTMLstringl;
}


const displayPokemonTypes = (pokemon) => {
    const pokemonHTMLstringl = pokemon.map((pokemon) =>`
    <li><p>${pokemon.types}</p></li>`
    ).join('');
    poke_types.innerHTML = pokemonHTMLstringl;
}


// Functions calling

fetchPokemon(randomArray(30,400));

