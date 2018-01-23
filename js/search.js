function fillPokemonList(search) {
    

}

function getAllPokemon() {
    
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBox").addEventListener("keydown", function(e) {
        fillPokemonList(document.getElementById("searchBox").value);
    });

});
