document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const bodyFat = parseFloat(document.getElementById('bodyFat').value);
    const date = document.getElementById('date').value;

    // Cálculo do IMC
    const imc = (weight / (height * height)).toFixed(2);
    const classification = getClassification(imc);

    // Criar um objeto para o registro
    const record = {
        date: date,
        weight: weight,
        height: height,
        bodyFat: bodyFat,
        imc: imc,
        classification: classification
    };

    // Salvar o registro no localStorage
    saveRecord(record);
    displayRecords();
});

// Função para salvar o registro no localStorage
function saveRecord(record) {
    let records = JSON.parse(localStorage.getItem('healthRecords')) || [];
    records.push(record);
    localStorage.setItem('healthRecords', JSON.stringify(records));
}

// Função para exibir os registros
function displayRecords() {
    const recordsDiv = document.getElementById('records');
    recordsDiv.innerHTML = '<h2>Registros Salvos</h2>';
    
    const records = JSON.parse(localStorage.getItem('healthRecords')) || [];
    if (records.length === 0) {
        recordsDiv.innerHTML += '<p>Nenhum registro encontrado.</p>';
        return;
    }

    records.forEach((record, index) => {
        recordsDiv.innerHTML += `
            <div class="record">
                <p>Data: ${record.date}</p>
                <p>Peso: ${record.weight} kg</p>
                <p>Altura: ${record.height} m</p>
                <p>Porcentagem de Gordura Corporal: ${record.bodyFat}%</p>
                <p>IMC: ${record.imc}</p>
                <p>Classificação: ${record.classification}</p>
                <button onclick="deleteRecord(${index})">Apagar</button>
            </div>
        `;
    });
}

// Função para apagar um registro específico
function deleteRecord(index) {
    let records = JSON.parse(localStorage.getItem('healthRecords')) || [];
    records.splice(index, 1);
    localStorage.setItem('healthRecords', JSON.stringify(records));
    displayRecords();
}

// Função para apagar todos os registros
document.getElementById('clearRecords').addEventListener('click', function() {
    localStorage.removeItem('healthRecords');
    displayRecords();
});

// Função para obter a classificação do IMC com base nos valores fornecidos
function getClassification(imc) {
    if (imc < 18.5) {
        return 'Magreza (Grau 0)';
    } else if (imc >= 18.5 && imc < 25.0) {
        return 'Normal (Grau 0)';
    } else if (imc >= 25.0 && imc < 30.0) {
        return 'Sobrepeso (Grau I)';
    } else if (imc >= 30.0 && imc < 40.0) {
        return 'Obesidade (Grau II)';
    } else {
        return 'Obesidade Grave (Grau III)';
    }
}

