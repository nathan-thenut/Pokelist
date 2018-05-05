function getPkmnData(url, search) {
    
    $.getJSON(url, function(json) {
        console.log(json);
        fillPokemonList(search, json);
    });
  
}


function createElemWithHtml(tag, html) {
    var x = document.createElement(tag);
    x.innerHTML = html;
    return x;
}


function matchFilter(filter, pkmn) {

    console.log(filter);
    switch (filter) {
        case pkmn["name"]:
            return true;
            break;
        case pkmn["type_one"]:
            return true;
            break;
        case pkmn["type_two"]:
            return true;
            break;
        case pkmn["nature"]:
            return true; 
            break;
        case pkmn["ability"]:
            return true;
            break;
        case pkmn["item"]:
            return true;
            break;
        case pkmn["dexno"]:
            return true;
            break;
        default:
            return false;
    }
}




function match(searchInput, pkmn) {
    //Filters: Name, Typ, Wesen, Fähigkeit, Item
    //(Attacken?)

    // return true if we have no search input
    if(searchInput == "") {
        return true;
    }


    // Get all filters
    var filters = [];
    if (searchInput.includes(" ")) {
        filters = searchInput.split(" ");
    } else {
        filters.push(searchInput);
    }
    
    console.log("Filters: ");
    console.log(filters);

    for (var i = 0; i < filters.length; i++) {
        if(!matchFilter(filters[i], pkmn)) {
            return false;
        }
    }

    return true;
}



function fillPokemonList(search, data) {
    let pkmnlist = document.getElementById("pkmnlist");

    $(".pokemon-row").remove();
    
    for (var pkmn of data) {
        console.log(pkmn["name"]);
        console.log("Match: " + match(search, pkmn));
        if (match(search, pkmn)) {
            var pkmnrow = document.createElement("div");
            pkmnrow.id = pkmn["name"];
            pkmnrow.className = "pokemon-row";
            
            var pkmntitle = document.createElement("div");
            pkmntitle.className = "pokemon-title";
            
            if (pkmn["type_one"] && pkmn["type_two"]) {
                pkmntitle.style.background = "linear-gradient(to right, " + window.type_colors[pkmn["type_one"]] + ", " + window.type_colors[pkmn["type_two"]] + ")";
            } else {
                pkmntitle.style.background = window.type_colors[pkmn["type_one"]];
            }
            
            pkmntitle.innerHTML = "<h2 class=\"pokemon-name\">" + pkmn["name"] + " #" + pkmn["dexno"] + "</h2>";
            pkmnrow.appendChild(pkmntitle);
            
            var pkmnpicture = document.createElement("div");
            pkmnpicture.className = "pokemon-picture";
            pkmnpicture.innerHTML = "<img src=\"images/" + pkmn["gif"] + "\">";
            pkmnrow.appendChild(pkmnpicture);

            var pkmnnature = document.createElement("div");
            pkmnnature.className = "pokemon-nature";
            pkmnnature.appendChild(createElemWithHtml("h4", "Info"));
            var naturetable = document.createElement("table");
            var nfirstrow = document.createElement("tr");
            nfirstrow.appendChild(createElemWithHtml("th", "Typ"));
            
            if (pkmn["type_one"] && pkmn["type_two"]) {
                nfirstrow.appendChild(createElemWithHtml("td", pkmn["type_one"] + " / " + pkmn["type_two"]));
            } else {
                nfirstrow.appendChild(createElemWithHtml("td", pkmn["type_one"]));
            }
            naturetable.appendChild(nfirstrow);
            
            var nsecondrow = document.createElement("tr");
            nsecondrow.appendChild(createElemWithHtml("th", "Wesen"));
            nsecondrow.appendChild(createElemWithHtml("td", pkmn["nature"]));
            naturetable.appendChild(nsecondrow);
            
            var nthirdrow = document.createElement("tr");
            nthirdrow.appendChild(createElemWithHtml("th", "Fähigkeit"));
            nthirdrow.appendChild(createElemWithHtml("td", pkmn["ability"]));
            naturetable.appendChild(nthirdrow);

            var nfourthrow = document.createElement("tr");
            nfourthrow.appendChild(createElemWithHtml("th", "Item"));
            nfourthrow.appendChild(createElemWithHtml("td", pkmn["item"]));
            naturetable.appendChild(nfourthrow);
            pkmnnature.appendChild(naturetable);
            pkmnrow.appendChild(pkmnnature);

            var pkmnwerte = document.createElement("div");
            pkmnwerte.className = "pokemon-werte";
            pkmnwerte.appendChild(createElemWithHtml("h4", "Werte"));
            var wertetable = document.createElement("table");
            var wertehead = document.createElement("thead");
            var werteheadrow = document.createElement("tr");
            werteheadrow.appendChild(document.createElement("th"));
            werteheadrow.appendChild(createElemWithHtml("th", "DV"));
            werteheadrow.appendChild(createElemWithHtml("th", "EV"));
            werteheadrow.appendChild(document.createElement("th"));
            werteheadrow.appendChild(createElemWithHtml("th", "DV"));
            werteheadrow.appendChild(createElemWithHtml("th", "EV"));
            wertehead.appendChild(werteheadrow);
            wertetable.appendChild(wertehead);
            
            var wertebody = document.createElement("tbody");
            var wbodyfirstrow = document.createElement("tr");
            wbodyfirstrow.appendChild(createElemWithHtml("th", "KP"));
            wbodyfirstrow.appendChild(createElemWithHtml("td", pkmn["DV"]["KP"]));
            wbodyfirstrow.appendChild(createElemWithHtml("td", pkmn["EV"]["KP"]));

            wbodyfirstrow.appendChild(createElemWithHtml("th", "SP. ATK"));
            wbodyfirstrow.appendChild(createElemWithHtml("td", pkmn["DV"]["SP.ATK"]));
            wbodyfirstrow.appendChild(createElemWithHtml("td", pkmn["EV"]["SP.ATK"]));
            wertebody.appendChild(wbodyfirstrow);
            
            var wbodysecondrow = document.createElement("tr");
            wbodysecondrow.appendChild(createElemWithHtml("th", "ATK"));
            wbodysecondrow.appendChild(createElemWithHtml("td", pkmn["DV"]["ATK"]));
            wbodysecondrow.appendChild(createElemWithHtml("td", pkmn["EV"]["ATK"]));

            wbodysecondrow.appendChild(createElemWithHtml("th", "SP. DEF"));
            wbodysecondrow.appendChild(createElemWithHtml("td", pkmn["DV"]["SP.DEF"]));
            wbodysecondrow.appendChild(createElemWithHtml("td", pkmn["EV"]["SP.DEF"]));
            wertebody.appendChild(wbodysecondrow);
            
            var wbodythirdrow = document.createElement("tr");
            wbodythirdrow.appendChild(createElemWithHtml("th", "DEF"));
            wbodythirdrow.appendChild(createElemWithHtml("td", pkmn["DV"]["DEF"]));
            wbodythirdrow.appendChild(createElemWithHtml("td", pkmn["EV"]["DEF"]));

            wbodythirdrow.appendChild(createElemWithHtml("th", "INIT"));
            wbodythirdrow.appendChild(createElemWithHtml("td", pkmn["DV"]["INIT"]));
            wbodythirdrow.appendChild(createElemWithHtml("td", pkmn["EV"]["INIT"]));
            wertebody.appendChild(wbodythirdrow);
            wertetable.appendChild(wertebody);
            pkmnwerte.appendChild(wertetable);
            pkmnrow.appendChild(pkmnwerte);


            var pkmnattacks = document.createElement("div");
            pkmnattacks.className = "pokemon-attacken";
            pkmnattacks.appendChild(createElemWithHtml("h4", "Attacken"));

            var attacktable = document.createElement("table");
            attacktable.appendChild(createElemWithHtml("tr", "<td>" + pkmn["attacks"][0] + "</td>"));
            attacktable.appendChild(createElemWithHtml("tr", "<td>" + pkmn["attacks"][1] + "</td>"));
            attacktable.appendChild(createElemWithHtml("tr", "<td>" + pkmn["attacks"][2] + "</td>"));
            attacktable.appendChild(createElemWithHtml("tr", "<td>" + pkmn["attacks"][3] + "</td>"));
            pkmnattacks.appendChild(attacktable);
            pkmnrow.appendChild(pkmnattacks);

            pkmnlist.appendChild(pkmnrow);
        }
    
    
    }

   
}

document.addEventListener("DOMContentLoaded", function () {
    
    $.getJSON("data/type_colors.json", function(json) {
        console.log(json);
        window.type_colors = json;
        getPkmnData("data/pkmn.json", "");
    });
    

    document.getElementById("searchBox").addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            getPkmnData("data/pkmn.json", document.getElementById("searchBox").value);
        }
    });

});
