const body = document.querySelector("body")
const tenis = document.querySelector(".imagem-tenis")
const botaoCarrinho = document.querySelector(".botao-carrinho");
const botoesCores = document.querySelectorAll(".botoes");

function toast (msg, ms =2300){
    let box = document.querySelector("#toast-box");
    if (!box){
        box=document.createElement("div");
        box.id = "toast-box";
        box.setAttribute("aria-live", "polite");
        box.setAttribute("role", "status");
        document.body.appendChild(box);
    }
    const t=document.createElement("div");
    t.className="toast";
    t.textContent=msg;
    box.appendChild(t);
    setTimeout(() => t.remove(), ms);

}

function mudarVisual(cor, imagem){
    body.style.transition= "background 0.6s ease";
    body.style.transition=cor;
    botoesCores.forEach(btn => btn.classList.remove("is-active"));
    tenis.style.opacity=0;
    setTimeout(() => {
        tenis.src = cor;
        tenis.style.opacity=1;
    }, 350 );

}

botaoCarrinho?.addEventListener("click", () => {
    toast("Produto adicionado ao Carrinho!");

});

botoesCores.forEach(btn => {
    btn.addEventListener("click", () => {
        botoesCores.forEach(b=>b.classList.remove("is-acttive"));
        btn.classList.add("is active");
    });
});

document.addEventListener("keydown", (e) => {
  const key = e.key?.toLowerCase();
  if (key === "c") {
    mudarVisual("#5d8cce", "img/nike2.png");
    marcarAtivo("azul");
    toast("🎨 Cor Azul aplicada (atalho: C)");
  } else if (key === "v") {
    mudarVisual("#ccee66", "img/nike1.png");
    marcarAtivo("verde");
    toast("🎨 Cor Verde aplicada (atalho: V)");
  } else if (key === "r") {
    mudarVisual("#ff9eb5", "img/nike3.png");
    marcarAtivo("rosa");
    toast("🎨 Cor Rosa aplicada (atalho: R)");
  }
});

function marcarAtivo(classeCor){
 botoesCores.forEach(btn => {
   btn.classList.toggle("is-active", btn.classList.contains(classeCor));
 });
}

if (typeof window.mudarVisual !== "function") {
  const _mudarVisualOriginal = typeof mudarVisual === "function" ? mudarVisual : null;

  window.mudarVisual = function(cor, imagem){
    try {
      console.log("[mudarVisual] chamada com:", { cor, imagem });

      if (_mudarVisualOriginal) {
        _mudarVisualOriginal(cor, imagem);
      } else {
        document.body.style.background = cor;

        const img = document.querySelector(".imagem-tenis");
        if (!img) {
          console.warn("Elemento .imagem-tenis não encontrado");
          return;
        }

        const preload = new Image();
        preload.onload = () => { img.src = imagem; };
        preload.onerror = () => {
          console.error("Imagem não encontrada:", imagem);
  
          if (typeof toast === "function") toast("😕 Não achei a imagem do tênis.");
        };
        preload.src = imagem;
      }
    } catch (e) {
      console.error("Erro em mudarVisual:", e);
    }
  };
} else {
  window.mudarVisual = mudarVisual;
  console.log("[mudarVisual] exposta no window");
}