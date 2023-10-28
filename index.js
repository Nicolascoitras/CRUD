var usuarios = [
    {
        nome: "João",
        id: 1,
        email: "joao@email.com"
    },
    {
        nome: "Maria",
        id: 2,
        email: "maria@email.com"
    },
    {
        nome: "Pedro",
        id: 3,
        email: "pedro@email.com"
    }
];

function getNextId() {
    if (usuarios.length === 0) {
        return 1;
    }
    return Math.max(...usuarios.map(usuario => usuario.id)) + 1;
}

function Click() {
    var nome = document.querySelector('.name').value;
    var email = document.querySelector('.email').value;

    if (nome && email) {
        var novoUsuario = {
            nome: nome,
            id: getNextId(),
            email: email
        };
        usuarios.push(novoUsuario);
        atualizarListaUsuarios();
        console.log(usuarios);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function atualizarListaUsuarios() {
    var usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '';

    var table = document.createElement('table');

    for (var i = 0; i < usuarios.length; i++) {
        var usuario = usuarios[i];
        var informacoes = document.createElement('tr');

        var updateCell = document.createElement('button');
        updateCell.textContent = "Update";
        (function (userId) {
            updateCell.addEventListener('click', function() {
                var novoNome = prompt('Novo nome:');
                var novoEmail = prompt('Novo email:');
                atualizarUsuario(userId, novoNome, novoEmail);
            });
        })(usuario.id);

        var deleteCell = document.createElement('button');
        deleteCell.textContent = "Delete";
        (function (userId) {
            deleteCell.addEventListener('click', function() {
                excluirUsuario(userId);
            });
        })(usuario.id);

        var idCell = document.createElement('td');
        idCell.textContent = usuario.id;

        var nomeCell = document.createElement('td');
        nomeCell.textContent = usuario.nome;

        var emailCell = document.createElement('td');
        emailCell.textContent = usuario.email;

        informacoes.appendChild(idCell);
        informacoes.appendChild(nomeCell);
        informacoes.appendChild(emailCell);
        informacoes.appendChild(updateCell);
        informacoes.appendChild(deleteCell);

        table.appendChild(informacoes);
    }

    usersDiv.appendChild(table);
}

function atualizarUsuario(id, novoNome, novoEmail) {
    var usuario = usuarios.find(user => user.id === id);
    if (usuario) {
        usuario.nome = novoNome;
        usuario.email = novoEmail;
        atualizarListaUsuarios();
    }
}

function excluirUsuario(id) {
    var index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        usuarios.splice(index, 1);
        atualizarListaUsuarios();
    }
}

atualizarListaUsuarios();
