document.addEventListener('DOMContentLoaded', function () {
    renderizarTabela();
});

function BoletimEscolar() {
    try {
        let nomeAluno = document.getElementById("nomeAluno").value;
        let n1 = parseInt(document.getElementById("n1").value);
        let n2 = parseInt(document.getElementById("n2").value);
        let n3 = parseInt(document.getElementById("n3").value);
        let n4 = parseInt(document.getElementById("n4").value);

        if (n1 < 0 || n1 > 100 || n2 < 0 || n2 > 100 || n3 < 0 || n3 > 100 || n4 < 0 || n4 > 100) {
            throw new Error('Por favor, insira notas válidas no intervalo de 0 a 100.');
        }

        let media = (n1 + n2 + n3 + n4) / 4;
        let situacao;

        if (media >= 70) {
            situacao = "Aprovado";
        } else if (media >= 50) {
            situacao = "Recuperação";
        } else {
            situacao = "Reprovado";
        }

        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

        alunos.push({
            nome: nomeAluno,
            nota1: n1,
            nota2: n2,
            nota3: n3,
            nota4: n4,
            media: media,
            situacao: situacao
        });

        localStorage.setItem('alunos', JSON.stringify(alunos));
        renderizarTabela();
    } catch (error) {
        alert(error.message);
    }
}

function renderizarTabela() {
    let corpoTabelaResultados = document.getElementById("corpoTabelaResultados");
    corpoTabelaResultados.innerHTML = "";

    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    alunos.forEach((aluno, indice) => {
        let novaLinha = corpoTabelaResultados.insertRow();

        if (aluno.situacao === "Aprovado") {
            novaLinha.classList.add("Aprovado");
        } else if (aluno.situacao === "Recuperação") {
            novaLinha.classList.add("Recuperacao");
        } else {
            novaLinha.classList.add("Reprovado");
        }

        let celulaIndice = novaLinha.insertCell();
        celulaIndice.innerHTML = indice + 1;

        for (let propriedade in aluno) {
            let celula = novaLinha.insertCell();
            celula.innerHTML = aluno[propriedade];
        }

        let celulaExcluir = novaLinha.insertCell();
        let botaoExcluir = document.createElement('button');
        botaoExcluir.innerHTML = 'Excluir';
        botaoExcluir.onclick = function () {
            apagarAluno(indice);
        };
        celulaExcluir.appendChild(botaoExcluir);
    });
}


function calcularMediaGeral() {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    if (alunos.length === 0) {
        alert('Não há alunos para calcular a média geral.');
        return;
    }

    let somaMedias = alunos.reduce((total, aluno) => total + aluno.media, 0);
    let mediaGeral = somaMedias / alunos.length;

    alert(`Média Geral: ${mediaGeral.toFixed(2)}`);
}

function alunosRisco() {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    if (alunos.length === 0) {
        alert('Não há alunos registrados ou ocorreu um problema ao recuperar os dados.');
        return;
    }

    let alunosRisco = alunos.filter(aluno => aluno.situacao === "Recuperação");

    if (alunosRisco.length > 0) {
        let mensagem = "Alunos em situação de risco:\n";

        alunosRisco.forEach(aluno => {
            mensagem += `${aluno.nome}\n`;
        });

        alert(mensagem);
    } else {
        alert('Não há alunos em situação de risco.');
    }
}

function apagarAluno(indice) {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    if (indice >= 0 && indice < alunos.length) {
        alunos.splice(indice, 1);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        renderizarTabela();
    } else {
        alert('Índice inválido.');
    }
}