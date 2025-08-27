const TOTAL_LEVELS = 15;

if (!localStorage.getItem("levelProgress")) {
  localStorage.setItem("levelProgress", "1");
}

// --- Funções de jogo ---
function completeLevel(n) {
  let progress = parseInt(localStorage.getItem("levelProgress") || "1");

  if(n >= progress) {
    localStorage.setItem("levelProgress", (n + 1).toString());
  }

  if(n < TOTAL_LEVELS) {
    window.location.href = `level_${n + 1}.html`;
  } else {
    showMessage("🎉 Parabéns! Você zerou todos os levels!");
    localStorage.setItem("levelProgress", (TOTAL_LEVELS + 1).toString()); // desbloqueia Levels
    setTimeout(() => window.location.href = "index.html", 2000);
  }
}

function showMessage(text, duration = 2000) {
  let msgBox = document.getElementById("gameMessage");
  if(!msgBox) {
    msgBox = document.createElement("div");
    msgBox.id = "gameMessage";
    document.body.appendChild(msgBox);
  }
  msgBox.innerText = text;
  msgBox.style.display = "block";

  clearTimeout(msgBox._timeout);
  msgBox._timeout = setTimeout(() => {
    msgBox.style.display = "none";
  }, duration);
}

// --- Modal de Créditos ---
(function(){
  const modal = document.createElement("div");
  modal.id = "creditsModal";
  modal.style.cssText = `
    display:none; 
    position:fixed; top:0; left:0; width:100%; height:100%; 
    background:rgba(0,0,0,0.8); color:#eee; 
    display:flex; justify-content:center; align-items:center; 
    flex-direction:column; z-index:999;
  `;
  modal.innerHTML = `
    <div style="background:#222; padding:30px; border-radius:15px; text-align:center; max-width:400px; width:80%;">
      <h2 id="creditsTitle">Créditos do Jogo</h2>
      <p id="creditsCreator">Criador: KsDev</p>
      <p id="creditsContact">Contato: contatoksdev@tutamail.com</p>
      <button id="closeCreditsBtn" style="margin-top:20px; padding:10px 20px; border:none; border-radius:8px; background:#2c1e33; color:#fff; cursor:pointer;">Fechar</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("closeCreditsBtn").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Função global para abrir os créditos
  window.showCredits = function(currentLevel){
    if(currentLevel === TOTAL_LEVELS){ 
      showMessage("🎮 Obrigado por jogar!");
      return;
    }
    modal.style.display = "flex";
  }

})();
