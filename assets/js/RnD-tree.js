'use strict';

var configWeb = {
    container: '#Techweb',
    rootOrientation: 'WEST',
    nodeAlign: 'TOP',
    hideRootNode: true,
    siblingSeparation: 20,
    subTeeSeparation: 30,
    scrollbar: 'resize',
    connectors: {
      type: 'step',
      style: {
          "stroke-width": 2.5
      }
    },
    node: {
        HTMLclass: 'web',
        collapsable: false
    },
    animation: {
        nodeAnimation: "easeOutBounce",
        nodeSpeed: 700,
        connectorsSpeed: 700,
    },
    callback: {
        onTreeLoaded: function() {
            const observer = lozad();
            observer.observe();
            badwolf();
        }
    }
};

function setup(web) {
    var tmpl = $.templates("#node-template");
    var html = tmpl.render(web);

    web.HTMLid = web.key;
    web.HTMLclass = web.area;
    web.innerHTML = html;

    $(web.children).each(function(i, node){
        setup(node);
    });
};

$(document).ready(function(){
    load_tree();
});

function _load(jsonData) {
    var container = "#Techweb-" + jsonData.children[0].name;
    var myconfig = {container: container};
    $.extend(true, myconfig, configWeb);

   new Treant({chart:myconfig, nodeStructure: jsonData.children[0], $});
}

function load_tree() {
        $.getJSON('Techweb.json', function(jsonData) {
            setup(jsonData);
            _load(jsonData);
    });    
}


function reqFetch(string) {
    var cow = string;
    //Grabs the json file and throws the resulting data into a local variable
    $.getJSON('Techweb.json',function(jsonData) {
        //Variable is sent to a filter function that sorts through it.
        //Finding any entry that requires multiple parents...sort of
        mental(jsonData, cow);
    });
}


//The sticky peanut butter of it all
function badwolf() {
    //Upon clicking any node
    $("div.node").click(function() {
        //The code will grab the node that was clicked and put it in an array
        var Grabby = $(this).children();
        var tempary = [];
        //For every entry in this array, it will push it to another array
        Grabby.each(function(i, node){
            tempary.push(node);
        });
        //The code then removes three array elements which are un-needed 
        tempary.splice(1,3);
        cat = $(tempary).attr("title"); 
        reqFetch(cat);
    });        
}

function Hell(Slapper) {
    var cera = $("div#Techweb").children();
    var carl = [];
    cera.each(function(i, node){
        carl.push(node);
    });
    carl.splice(0,1);
    chaos(Slapper, carl);
}

function chaos(Slapper, free) {
    $(free).each(function(i, node){
        if ($(node).attr("selected") == "selected") {
            $(node).removeAttr("selected");
        }
        let fock = $(node).children();
        $(fock).each(function(i, nodetwo){
            if ($(nodetwo).attr("selected") == "selected") {
                $(nodetwo).removeAttr("selected");
            }
                for (let x of Slapper) {
                    if ($(nodetwo).attr("title") == x) {
                        if ($(nodetwo).attr("selected") !== "selected") {
                            var chotic = nodetwo.parentElement;
                            console.log(chotic);
                           $(chotic).attr("selected", "selected");
                        } 
                    }
                }
        });
    });
}

function mental(jsonData, string) {
    $(jsonData.children).each(function(i, node){
        if (typeof node.requirement !== "undefined" && node.requirement !== null && node.name === string) {
            var Slapper = node.requirement;
            var Blocker = node.name;
            if (string == Blocker) {
                Hell(Slapper);
                return;
            }
        } else {
            mental(node, string);
        }    
    });
}

let cat;

/*
        //The code checks if the resulting array's last entry has an attribute with the name selected
        if ($(tempary).attr("selected")=="selected") {
            //If it does, then it removes it
            $(tempary).removeAttr("selected");
        } else {
            $(tempary).attr("selected", "you"); 
        }

*/