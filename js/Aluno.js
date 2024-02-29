document.addEventListener('DOMContentLoaded', function () {
    var exibir = document.getElementById('dadosExibidos');
    var tabela = document.querySelector('tbody');

    if (localStorage.getItem('alunos')) {
        var dados = localStorage.getItem('alunos');
        var alunosObjeto = JSON.parse(dados);

        if (alunosObjeto.length > 0) {
            for (var i = 0; i < alunosObjeto.length; i++) {
                var aluno = alunosObjeto[i];
                var newRow = tabela.insertRow();
                newRow.insertCell(0).textContent = i + 1;
                newRow.insertCell(1).textContent = aluno.nome;
                newRow.insertCell(2).textContent = aluno.nota1;
                newRow.insertCell(3).textContent = aluno.nota2;
                newRow.insertCell(4).textContent = aluno.nota3;
                newRow.insertCell(5).textContent = aluno.nota3;
                newRow.insertCell(6).textContent = aluno.media;
                newRow.insertCell(7).textContent = aluno.situacao;
            }
        } else {
            alert('Os dados não estão presentes no localStorage');
            exibir.innerHTML = '<p>Os dados não estão presentes no localStorage</p>';
        }
    }
});