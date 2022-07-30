let musicas = [
    {titulo:'thank u, next', artista:'Ariana Grande', src:'musicas/Ariana Grande - thank u, next.mp3', img:'imagens/ag.jpg'},
    {titulo:'Dive', artista:'Ed Sheeran', src:'musicas/Ed Sheeran - Dive.mp3', img:'imagens/es.jpg'},
    {titulo:'Beggin', artista:'Maneskin', src:'musicas/Måneskin - Beggin.mp3', img:'imagens/maneskin.jpg'},
    {titulo:'Girls Like You', artista:'Maroon 5', src:'musicas/Maroon 5 - Girls Like You.mp3', img:'imagens/m5.jpg'},
    {titulo:'It\'ll Be Okay', artista:'Shawn Mendes', src:'musicas/Shawn Mendes - It\'ll Be Okay.mp3', img:'imagens/sm.jpg'}
];


let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.seta-anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.seta-proximo').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 5) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        pausarMusica = musicas[index].src;
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}