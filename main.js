window.onload = function () {
    loeValik(document.querySelector("#esimenejada").innerHTML);
    looVäli();
}

function loeValik(tekst) {
    const protsessidtekst = tekst.split(";");
    var protsessid = [];
    for (var protsessitekst of protsessidtekst) {
        protsessiosad = protsessitekst.split(",")
        var protsess = {
            mälumaht: protsessiosad[0],
            kestus: protsessiosad[1],
            lõpp: protsessiosad[1],
            täht: "-"
        }
        protsessid.push(protsess);

    }
    return protsessid;

}

function looVäli() {
    var väli = document.querySelector(".grid");
    väli.innerHTML=""
    väli.appendChild(looEsimeneRida());
    for (let i = 0; i < 10; i++) {
        väli.appendChild(looRida(i+1, "-"))
    }
}

function looRida(etapp, protsess) {
    var rida = document.createElement("div");
    rida.className = "rida" + " " +etapp;
    var etappDiv = document.createElement("p");
    etappDiv.innerHTML=etapp;
    etappDiv.className="etapp";
    var protsessDiv = document.createElement("p");
    protsessDiv.innerHTML = protsess;
    protsessDiv.className="protsess"+" "+etapp;
    rida.appendChild(etappDiv);
    rida.appendChild(protsessDiv);

    for (let i = 0; i <50; i++) {
        var kast = document.createElement("div");
        kast.className = "kast" + " " + etapp;
        kast.innerHTML = "-";
        rida.appendChild(kast);
    }
    return rida;
}

function looEsimeneRida() {
    var rida = document.createElement("div");
    rida.className = "rida 0";
    var etappDiv = document.createElement("p");
    etappDiv.innerHTML="<b>Etapp</b>";
    etappDiv.className="etapp";
    var protsessDiv = document.createElement("p");
    protsessDiv.innerHTML = "<b>Lisatud protsess</b>";
    protsessDiv.className="protsess";
    rida.appendChild(etappDiv);
    rida.appendChild(protsessDiv);

    for (let i = 0; i <50; i++) {
        var kast = document.createElement("div");
        kast.className = "esimenekast";
        kast.innerHTML = i;
        rida.appendChild(kast);
    }
    return rida;
}
function getJada() {
    var valik = document.querySelector('input[name="jada"]:checked').id;
    var jada;
    if (valik==="enda") {
        jada = document.querySelector("#endajada").value;
    } else {
        jada = document.querySelector("#"+valik+"jada").innerHTML;
    }
    if (jada==="") {
        alert("Antud jada pole õigel kujul!")
        return null;
    }
    return jada;



}

var tähed = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function firstFit() {
    puhasta()
    var jada = getJada();
    var protsessid = loeValik(jada);
    var protsessiosad = jada.split(";")
    var grid = document.querySelector(".grid");
    var read = grid.children;
    var pointer = 0
    var mälu = "-.".repeat(50).split(".")
    mälu.pop();
    for (let i = 1; i <= protsessid.length; i++) {
        var prot = document.getElementsByClassName("protsess "+i)[0];
        prot.innerHTML = tähed[i-1]+": " + protsessiosad[i-1];
        var protsess = protsessid[i-1]
        protsess.täht = tähed[i-1]

        for (let prots of protsessid) {
            if (i === prots.lõpp) {
                for (let j = 0; j < mälu.length; j++) {
                    if (mälu[j]===prots.täht) {
                        mälu[j] = "-"
                    }
                }
            }

        }
        pointer = leiaPointer(protsess, mälu);

        if (pointer==null) {
            joonistaError(i);
            return;
        }
        for (let j = 0; j < protsess.mälumaht; j++) {
            mälu[pointer++] = protsess.täht
        }
        protsess.lõpp = +i + +protsess.lõpp;
        joonistaRida(mälu, i)
    }
}
function leiaPointer(prot, mälu) {
    let counter = 0;
    for (let i = 0; i < mälu.length; i++) {
        if (mälu[i]==="-") counter++;
        else counter = 0;
        if (counter== prot.mälumaht) {
            return i - prot.mälumaht+1;
        }

    }
    return null;
}
function joonistaRida(mälu, nr) {
    var rida = document.getElementsByClassName("kast "+nr)
    for (let i = 0; i < rida.length; i++) {
        rida[i].innerHTML = mälu[i]
        rida[i].className = "kast "+ nr+ " " + mälu[i]
    }
}

function lastFit() {
    puhasta()
    var jada = getJada();
    var protsessid = loeValik(jada);
    var protsessiosad = jada.split(";")
    var grid = document.querySelector(".grid");
    var read = grid.children;
    var pointer = 0
    var mälu = "-.".repeat(50).split(".")
    mälu.pop();
    for (let i = 1; i <= protsessid.length; i++) {
        var prot = document.getElementsByClassName("protsess "+i)[0];
        prot.innerHTML = tähed[i-1]+": " + protsessiosad[i-1];
        var protsess = protsessid[i-1]
        protsess.täht = tähed[i-1]

        for (let prots of protsessid) {
            if (i === prots.lõpp) {
                for (let j = 0; j < mälu.length; j++) {
                    if (mälu[j]===prots.täht) {
                        mälu[j] = "-"
                    }
                }
            }

        }
        pointer = leiaPointerLast(protsess, mälu);
        if (pointer==null) {
            joonistaError(i);
            return;
        }

        for (let j = 0; j < protsess.mälumaht; j++) {
            mälu[pointer++] = protsess.täht
        }
        protsess.lõpp = +i + +protsess.lõpp;
        joonistaRida(mälu, i)
    }
}
function leiaPointerLast(prot, mälu) {
    let counter = 0;
    let kriipsud = 0;
    for (let el of mälu) {
        if (el==="-") kriipsud++;
    }
    if (kriipsud===50) return 0;
    for (let i = mälu.length-1; i >=0; i--) {
        if(mälu[i]!="-") {
            for (let j = i + 1; ; j++) {
                if (mälu[j] != "-") {
                    counter = 0;
                    break;
                } else counter++;
                if (counter == prot.mälumaht) return j - counter + 1;
            }
        }
    }

    return null;
}

function bestFit() {
    puhasta()
    var jada = getJada();
    var protsessid = loeValik(jada);
    var protsessiosad = jada.split(";")
    var grid = document.querySelector(".grid");
    var read = grid.children;
    var pointer = 0
    var mälu = "-.".repeat(50).split(".")
    mälu.pop();
    for (let i = 1; i <= protsessid.length; i++) {
        var prot = document.getElementsByClassName("protsess "+i)[0];
        prot.innerHTML = tähed[i-1]+": " + protsessiosad[i-1];
        var protsess = protsessid[i-1]
        protsess.täht = tähed[i-1]

        for (let prots of protsessid) {
            if (i === prots.lõpp) {
                for (let j = 0; j < mälu.length; j++) {
                    if (mälu[j]===prots.täht) {
                        mälu[j] = "-"
                    }
                }
            }

        }
        pointer = leiaPointerBest(protsess, mälu);
        if (pointer==null) {
            joonistaError(i);
            return;
        }

        for (let j = 0; j < protsess.mälumaht; j++) {
            mälu[pointer++] = protsess.täht
        }
        protsess.lõpp = +i + +protsess.lõpp;
        joonistaRida(mälu, i)
    }
}
function worstFit() {
    puhasta()
    var jada = getJada();
    var protsessid = loeValik(jada);
    var protsessiosad = jada.split(";")
    var grid = document.querySelector(".grid");
    var read = grid.children;
    var pointer = 0
    var mälu = "-.".repeat(50).split(".")
    mälu.pop();
    for (let i = 1; i <= protsessid.length; i++) {
        var prot = document.getElementsByClassName("protsess "+i)[0];
        prot.innerHTML = tähed[i-1]+": " + protsessiosad[i-1];
        var protsess = protsessid[i-1]
        protsess.täht = tähed[i-1]

        for (let prots of protsessid) {
            if (i === prots.lõpp) {
                for (let j = 0; j < mälu.length; j++) {
                    if (mälu[j]===prots.täht) {
                        mälu[j] = "-"
                    }
                }
            }

        }
        pointer = leiaPointerWorst(protsess, mälu);
        if (pointer==null) {
            joonistaError(i);
            return;
        }

        for (let j = 0; j < protsess.mälumaht; j++) {
            mälu[pointer++] = protsess.täht
        }
        protsess.lõpp = +i + +protsess.lõpp;
        joonistaRida(mälu, i)
    }
}
function randomFit() {
    puhasta()
    var jada = getJada();
    var protsessid = loeValik(jada);
    var protsessiosad = jada.split(";")
    var grid = document.querySelector(".grid");
    var read = grid.children;
    var pointer = 0
    var mälu = "-.".repeat(50).split(".")
    mälu.pop();
    for (let i = 1; i <= protsessid.length; i++) {
        var prot = document.getElementsByClassName("protsess "+i)[0];
        prot.innerHTML = tähed[i-1]+": " + protsessiosad[i-1];
        var protsess = protsessid[i-1]
        protsess.täht = tähed[i-1]

        for (let prots of protsessid) {
            if (i === prots.lõpp) {
                for (let j = 0; j < mälu.length; j++) {
                    if (mälu[j]===prots.täht) {
                        mälu[j] = "-"
                    }
                }
            }

        }
        pointer = leiaPointerRandom(protsess, mälu);
        if (pointer==null) {
            joonistaError(i);
            return;
        }

        for (let j = 0; j < protsess.mälumaht; j++) {
            mälu[pointer++] = protsess.täht
        }
        protsess.lõpp = +i + +protsess.lõpp;
        joonistaRida(mälu, i)
    }
}
function joonistaError(rida) {
    var rida = document.getElementsByClassName("rida "+rida)[0];
    const error = document.createElement("div");
    error.innerHTML = "Protsess ei mahu mällu!"
    error.className = "error"
    var children = rida.children;
    for (let i = children.length-1; i >= 0; i--) {
        if (children[i].className.match("kast")) {
            rida.removeChild(children[i]);
        }
    }
    rida.appendChild(error);
}
function leiaPointerBest(prot, mälu) {
    var counterid = []
    let counter = 0;
    for (let i = 0; i < mälu.length; i++) {
        if (mälu[i]==="-") counter++;
        else counter = 0;
        if (counter== prot.mälumaht) {
            let pikkus = 0;
            for (let j = i-counter+1; ;j++) {
                if (mälu[j]==="-") pikkus++;
                else break;
            }
            var counterObj = {
                algus: i-counter+1,
                length: pikkus,
            }
            counterid.push(counterObj);
        }

    }
    counterid = counterid.sort(compareBest());
    return (counterid[0] != null) ? counterid[0].algus: null;

}
function leiaPointerRandom(prot, mälu) {
    var counterid = []
    let counter = 0;
    for (let i = 0; i < mälu.length; i++) {
        if (mälu[i]==="-") counter++;
        else counter = 0;
        if (counter== prot.mälumaht) {
            let pikkus = 0;
            for (let j = i-counter+1; ;j++) {
                if (mälu[j]==="-") pikkus++;
                else break;
            }
            var counterObj = {
                algus: i-counter+1,
                length: pikkus,
            }
            counterid.push(counterObj);
        }

    }

    var koht = counterid[Math.floor(Math.random() * counterid.length)];
    if (koht==null) return null;
    else return koht.algus;

}
function leiaPointerWorst(prot, mälu) {
    var counterid = []
    let counter = 0;
    for (let i = 0; i < mälu.length; i++) {
        if (mälu[i]==="-") counter++;
        else counter = 0;
        if (counter== prot.mälumaht) {
            let pikkus = 0;
            for (let j = i-counter+1; ;j++) {
                if (mälu[j]==="-") pikkus++;
                else break;
            }
            var counterObj = {
                algus: i-counter+1,
                length: pikkus,
            }
            counterid.push(counterObj);
        }

    }
    counterid = counterid.sort(compareWorst());
    return counterid[0]!=null ? counterid[0].algus : null;

}
function compareBest(a, b) {
    return (a,b) => (a.length > b.length) ? 1 : ((b.length > a.length) ? -1 : 0)
}

function compareWorst(a, b) {
    return (a,b) => (a.length < b.length) ? 1 : ((b.length < a.length) ? -1 : 0)
}
function puhasta() {
    looVäli()
}



