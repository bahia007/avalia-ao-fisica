
// Função para carregar os registros do Local Storage
function loadStudyLog() {
    const logList = document.getElementById('log-list');
    logList.innerHTML = ''; // Limpa a lista antes de carregar

    const studyLog = JSON.parse(localStorage.getItem('studyLog')) || [];

    studyLog.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.subject} - ${item.hours} - ${item.days} - ${item.completed ? 'Concluído' : 'Não Concluído'}`;
        logList.appendChild(listItem);
    });
}

// Função para salvar o registro no Local Storage
function saveStudyLog(subject, hours, days, completed) {
    const studyLog = JSON.parse(localStorage.getItem('studyLog')) || [];
    studyLog.push({ subject, hours, days, completed });
    localStorage.setItem('studyLog', JSON.stringify(studyLog));
}

// Função para apagar todos os registros de estudos
function clearStudyLog() {
    localStorage.removeItem('studyLog'); // Remove o item do Local Storage
    loadStudyLog(); // Atualiza a lista para refletir a remoção
}   

// Carregar os registros ao abrir a página
document.addEventListener('DOMContentLoaded', loadStudyLog);

document.getElementById('study-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const hours = document.getElementById('hours').value;
    const days = document.getElementById('days').value;
    const completed = document.getElementById('completed').checked;

    // Salvar o registro no Local Storage
    saveStudyLog(subject, hours, days, completed);

    // Atualizar a lista de registros
    loadStudyLog();

    // Limpar o formulário
    document.getElementById('study-form').reset();
});

// Adiciona um evento para o botão de limpar registros
document.getElementById('clear-log-button').addEventListener('click', function() {
    clearStudyLog();
});
