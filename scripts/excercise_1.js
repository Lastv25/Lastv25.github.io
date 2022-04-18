
// references
const poke_id = document.getElementById('poke_id');
const poke_names = document.getElementById('poke_names');
const poke_types = document.getElementById('poke_types');

// Functions definition

const randomArray = () => {
    const a1 = [362, 309, 335, 210, 21, 40, 247, 122, 152, 223, 74, 340, 368, 234, 162, 157, 229, 114, 63, 174, 395, 66, 375, 182, 144, 66, 266, 323, 317, 194];
    const a2 = [75, 173, 1, 254, 258, 313, 340, 383, 162, 202, 108, 368, 48, 171, 219, 52, 110, 262, 219, 213, 4, 356, 106, 358, 278, 59, 300, 113, 93, 250];
    const a3 = [63, 249, 364, 120, 271, 109, 8, 351, 88, 284, 297, 324, 109, 359, 191, 21, 384, 203, 26, 363, 266, 107, 154, 65, 106, 207, 98, 315, 31, 101];
    const a4 = [56, 149, 368, 162, 75, 160, 351, 254, 118, 26, 347, 236, 325, 192, 373, 40, 125, 2, 295, 357, 1, 197, 50, 221, 42, 266, 287, 5, 238, 129];
    const d = new Date();
    if (d.getDay()<3) {
        return a1;
    } else if (2<d.getDay()<5){
        return a2;
    } else if (4<d.getDay()<7){
        return a3;
    } else {
        return a4;
    }
}

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

fetchPokemon(randomArray());

