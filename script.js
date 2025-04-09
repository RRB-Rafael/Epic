document.addEventListener('DOMContentLoaded', function() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('sagas-container');
            
            data.forEach((saga, index) => {
                const imgNumber = (index + 1).toString().padStart(2, '0');
                
                const sagaElement = document.createElement('div');
                sagaElement.className = 'saga-container';
                
                // Aplica a cor de fundo diretamente no elemento
                sagaElement.style.backgroundColor = saga.cor;
                
                sagaElement.innerHTML = `
                    <img src="img/${imgNumber}.png" alt="${saga.nome}" class="saga-img">
                    <div class="saga-info">
                        <h2>${saga.nome}</h2>
                        <div class="info-item">
                            <span class="info-label">Músicas:</span> ${saga.musicas}
                        </div>
                        <div class="info-item">
                            <span class="info-label">Lançamento:</span> ${formatarData(saga.lancamento)}
                        </div>
                        <div class="info-item">
                            <span class="info-label">Duração total:</span> ${saga.duracao}
                        </div>
                    </div>
                `;
                
                container.appendChild(sagaElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            document.getElementById('sagas-container').innerHTML = 
                '<p>Erro ao carregar as informações das sagas.</p>';
        });
});

function formatarData(dataString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', options);
}