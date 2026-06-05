/* ==========================
   FAVORITOS
========================== */

let favoritos =
JSON.parse(localStorage.getItem("favoritos")) || [];

/* ==========================
   FAVORITAR
========================== */

function favoritar(nome){

    if(favoritos.includes(nome)){

        mostrarMensagem(
            `${nome} já está nos favoritos ❤️`
        );

        return;
    }

    favoritos.push(nome);

    salvarFavoritos();

    mostrarMensagem(
        `${nome} adicionado aos favoritos ❤️`
    );

    atualizarFavoritos();
}

/* ==========================
   REMOVER FAVORITO
========================== */

function removerFavorito(nome){

    favoritos =
    favoritos.filter(item => item !== nome);

    salvarFavoritos();

    atualizarFavoritos();

    mostrarMensagem(
        `${nome} removido dos favoritos`
    );
}

/* ==========================
   SALVAR
========================== */

function salvarFavoritos(){

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}

/* ==========================
   LISTA DE FAVORITOS
========================== */

function atualizarFavoritos(){

    const container =
    document.getElementById(
        "lista-favoritos"
    );

    if(!container) return;

    container.innerHTML = "";

    if(favoritos.length === 0){

        container.innerHTML = `
            <p>Nenhum favorito ainda.</p>
        `;

        atualizarContador();

        return;
    }

    favoritos.forEach(item => {

        const card =
        document.createElement("div");

        card.classList.add(
            "favorito-item"
        );

        card.innerHTML = `
            <strong>${item}</strong>

            <br><br>

            <button
            onclick="removerFavorito('${item}')">

            Remover

            </button>
        `;

        container.appendChild(card);

    });

    atualizarContador();
}

/* ==========================
   CONTADOR
========================== */

function atualizarContador(){

    let contador =
    document.getElementById(
        "contador-favoritos"
    );

    if(contador){

        contador.textContent =
        favoritos.length;

    }

}

/* ==========================
   MENSAGEM
========================== */

function mostrarMensagem(texto){

    let aviso =
    document.createElement("div");

    aviso.classList.add(
        "toast"
    );

    aviso.innerText = texto;

    document.body.appendChild(aviso);

    setTimeout(() => {

        aviso.classList.add(
            "mostrar"
        );

    },100);

    setTimeout(() => {

        aviso.classList.remove(
            "mostrar"
        );

        setTimeout(() => {

            aviso.remove();

        },500);

    },2500);

}

/* ==========================
   ANIMAÇÃO AO ROLAR
========================== */

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"aparecer"
);

}

});

},

{
threshold:0.15
}

);

window.addEventListener(

"DOMContentLoaded",

()=>{

document
.querySelectorAll(
"section, .card"
)
.forEach(el=>{

el.classList.add(
"oculto"
);

observer.observe(el);

});

atualizarFavoritos();

}

);

/* ==========================
   VOLTAR AO TOPO
========================== */

const botaoTopo =
document.createElement("button");

botaoTopo.innerHTML = "↑";

botaoTopo.id = "topo";

document.body.appendChild(
botaoTopo
);

window.addEventListener(

"scroll",

()=>{

if(window.scrollY > 500){

botaoTopo.style.opacity = "1";

}else{

botaoTopo.style.opacity = "0";

}

}

);

botaoTopo.addEventListener(

"click",

()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

}

);

/* ==========================
   EFEITO NO HEADER
========================== */

window.addEventListener(

"scroll",

()=>{

const header =
document.querySelector("header");

if(!header) return;

if(window.scrollY > 50){

header.style.background =
"#4a3728";

}else{

header.style.background =
"#5c4632";

}

}

);

/* ==========================
   INICIALIZAÇÃO
========================== */

atualizarFavoritos();