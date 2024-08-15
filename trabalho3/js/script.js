document.addEventListener("DOMContentLoaded", function() {
    // Função para salvar o estado no localStorage
    function salvarEstado() {
        const estados = {};
        document.querySelectorAll('.ambiente').forEach(ambiente => {
            let estadoAtual = Array.from(ambiente.classList).find(cls => ["ocupado", "livre", "manutencao"].includes(cls));
            estados[ambiente.id] = estadoAtual || "livre"; // Define um estado padrão caso não encontre
        });
        localStorage.setItem('estadosAmbientes', JSON.stringify(estados));
    }

    // Função para carregar o estado do localStorage
    function carregarEstado() {
        const estados = JSON.parse(localStorage.getItem('estadosAmbientes')) || {};
        for (let id in estados) {
            let elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.add(estados[id]);
                // Atualiza o aria-label para refletir o estado
                let novoLabel = `${elemento.textContent.trim()} - ${estados[id].charAt(0).toUpperCase() + estados[id].slice(1)}`;
                elemento.setAttribute('aria-label', novoLabel);
            }
        }
    }

    // Inicializa o estado dos ambientes
    carregarEstado();

    // Adiciona funcionalidade de troca de estado
    document.querySelectorAll('.change-state').forEach(button => {
        button.addEventListener('click', function() {
            let ambiente = this.parentElement;
            let estadosPossiveis = ["ocupado", "livre", "manutencao"];
            let estadoAtual = estadosPossiveis.find(estado => ambiente.classList.contains(estado));
            let proximoEstado = estadosPossiveis[(estadosPossiveis.indexOf(estadoAtual) + 1) % estadosPossiveis.length];

            // Remove o estado atual e adiciona o próximo estado
            ambiente.classList.remove(estadoAtual);
            ambiente.classList.add(proximoEstado);

            // Atualiza o aria-label para refletir o novo estado
            let novoLabel = `${ambiente.textContent.trim()} - ${proximoEstado.charAt(0).toUpperCase() + proximoEstado.slice(1)}`;
            ambiente.setAttribute('aria-label', novoLabel);

            // Salva o estado atualizado
            salvarEstado();
        });
    });
});