function cadastrarJogo() {
    const form = document.getElementById('cadastro-form');
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('http://localhost:8080/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            alert('Jogo cadastrado com sucesso!');
            form.reset();
        } else {
            throw new Error('Erro ao cadastrar jogo.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar jogo. Por favor, tente novamente.');
    });
}
function mudarPagina() {
   
    window.location.href = 'http://127.0.0.1:5500/index.html';
  //  carregarCards();  
}

document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar os cards dinamicamente
    function carregarCards() {
        fetch('http://localhost:8080/game')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('cards-container');

                // Para cada item nos dados recebidos, criar um card
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    // Adicionar imagem
                    const imagem = document.createElement('img');
                    imagem.src = item.imagem;
                    imagem.alt = item.nome;
                    card.appendChild(imagem);

                    // Adicionar nome
                    const nome = document.createElement('h2');
                    nome.textContent = item.nome;
                    card.appendChild(nome);

                    // Adicionar desenvolvedor
                    const desenvolvedor = document.createElement('p');
                    desenvolvedor.textContent = 'Desenvolvedor: ' + item.desenvolvedor;
                    card.appendChild(desenvolvedor);

                    // Adicionar valor
                    const valor = document.createElement('p');
                    valor.textContent = 'Valor: R$ ' + item.valor;
                    card.appendChild(valor);

                    // Adicionar card ao container
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os cards:', error);
            });
       }
         carregarCards();
   
});

window.addEventListener('scroll', function() {
    const titulo = document.getElementById('titulo');
    const cardsContainer = document.getElementById('cards-container');
    
    // Altura do scroll vertical
    const scrollY = window.scrollY || window.pageYOffset;

    // Altura do topo dos cards em relação ao topo da janela de visualização
    const cardsTop = cardsContainer.getBoundingClientRect().top;

    // Se o topo dos cards estiver acima do topo da janela de visualização, 
    // colocamos o título de volta à posição fixa no topo da página
    if (cardsTop <= 0) {
        titulo.style.position = 'fixed';
        titulo.style.top = '0';
        titulo.style.left = '0';
        titulo.style.width = '100%';
        titulo.style.background = '#ffffff';
        titulo.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        titulo.style.zIndex = '1000'; // Certifica-se de que o título esteja na frente de outros elementos
    } else {
        // Se os cards estiverem abaixo do topo da janela de visualização, voltamos o título ao fluxo normal do documento
        titulo.style.position = 'static';
        titulo.style.boxShadow = 'none';
    }
});