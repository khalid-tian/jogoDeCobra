window.onload = function () {
  const leticia = document.getElementById("khalid");
  const gameover = document.getElementById("gameover");
  const score = document.getElementById("pontuacao");
  const tempo = document.getElementById("tempo");
  let cobraBody = [];
  let direction = "right";
  let comida = null;
  let tempoInicio = 0;
  const velocidade = 100;
  let jogando = true;

  createcomida();
  createCobra();
  rodarOJogo();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function rodarOJogo() {
    while (jogando) {
      moveCobra();
      await sleep(velocidade);
    }
  }

  function createCobra(x = 0, y = 0) {
    const cobraDraw = document.createElement("div");
    cobraDraw.classList.add("cobra");
    if (cobraBody.length == 0) {
      cobraDraw.style.backgroundColor = "green";
      cobraDraw.style.borderRadius = "50%";
      cobraDraw.style.zIndex = "1";
    }
    const cobra = {
      draw: cobraDraw,
      y,
      x,
    };
    cobraBody.push(cobra);
    cobraDraw.style.left = cobra.x + "px";
    cobraDraw.style.top = cobra.y + "px";
    leticia.appendChild(cobraDraw);
  }

  function createcomida() {
    if (!comida) {
      const comidaDraw = document.createElement("div");
      comidaDraw.classList.add("comida");
      comida = {
        draw: comidaDraw,
      };
      leticia.appendChild(comidaDraw);
    }
    comida.x = Math.floor(Math.random() * 49) * 10;
    comida.y = Math.floor(Math.random() * 29) * 10;

    comida.draw.style.left = comida.x + "px";
    comida.draw.style.top = comida.y + "px";
  }

  function moveCobra() {
    if (!jogando) {
      return;
    }
    if (tempoInicio == 0) {
      tempoInicio = Date.now();
    }
    const tempoAtual = Date.now();
    tempo.innerText = Math.floor((tempoAtual - tempoInicio) / 1000);
    for (let i = cobraBody.length - 1; i >= 0; i--) {
      const cobra = cobraBody[i].draw;

      if (i == 0) {
        if (direction == "up") {
          cobraBody[i].y -= 10;
        } else if (direction == "down") {
          cobraBody[i].y += 10;
        } else if (direction == "left") {
          cobraBody[i].x -= 10;
        } else if (direction == "right") {
          cobraBody[i].x += 10;
        }
        if (
          cobraBody[i].x < 0 ||
          cobraBody[i].x > 490 ||
          cobraBody[i].y < 0 ||
          cobraBody[i].y > 290
        ) {
          gameover.style.display = "block";
          jogando = false;
        }
        if (
          cobraBody.filter(
            (item) => item.x == cobraBody[i].x && item.y == cobraBody[i].y
          ).length > 1
        ) {
          gameover.style.display = "block";
          jogando = false;
        }
      } else {
        cobraBody[i].x = Number(cobraBody[i - 1].x);
        cobraBody[i].y = Number(cobraBody[i - 1].y);
      }
      cobra.style.left = cobraBody[i].x + "px";
      cobra.style.top = cobraBody[i].y + "px";
    }
    checarColisao();
  }

  function checarColisao() {
    if (cobraBody[0].x == comida.x && cobraBody[0].y == comida.y) {
      createcomida();
      createCobra(
        cobraBody[cobraBody.length - 1].x,
        cobraBody[cobraBody.length - 1].y
      );

      score.innerText = cobraBody.length - 1;
    }
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "ArrowUp" && direction != "down") {
      direction = "up";
      console.log("Cima");
    }
    if (key === "ArrowDown" && direction != "up") {
      direction = "down";
      console.log("Baixo");
    }
    if (key === "ArrowLeft" && direction != "right") {
      direction = "left";
      console.log("Esquerda");
    }
    if (key === "ArrowRight" && direction != "left") {
      direction = "right";
      console.log("Direita");
    }
  });
  document.getElementById("reiniciar").addEventListener("click", function () {
    score.innerText = 0;
    for (let i = 0; i < cobraBody.length; i++) {
      cobraBody[i].draw.remove();
    }
    cobraBody = [];
    direction = "right";
    createcomida();
    createCobra();
    gameover.style.display = "none";
    jogando = true;
    tempoInicio = 0;
    rodarOJogo();
  });
};
