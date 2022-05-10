let pessoas = []

function carregar() {
  $.ajax({
    url: 'https://randomuser.me/api/?results=100&nat=br',
    dataType: 'json',
    success: function(data) {
      pessoas = data.results
      tratarDados()
    }
  });
        
}

function tratarDados() {
  $(pessoas).each(function(chave,valor) {
    let conteudo = `
      <tr>
        <td class="py-3">
          <img class="table-img" src="${valor.picture.thumbnail}" />
        </td>
        <td>${valor.login.username}</td>
        <td>${valor.name.first} ${valor.name.last}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            onclick="abrirModal('${valor.login.uuid}')"
          >
            Ver detalhes
          </button>
        </td>
      </tr>`
    
    let tabela = $('.minhaTabela');
    tabela.append(conteudo);
  })
}

function abrirModal(id) {
  const user = pessoas.filter(el => el.login.uuid === id)[0]

  $('#exampleModalLabel').text(user.name.first)

  let conteudo = `
    <div class="col-6">
      <div class="card" >
        <img src="${user.picture.large}" class="card-img-top"  alt="Foto de uma pessoa">
        <div class="card-body">
          <h5 class="card-title">${user.name.first}</h5>
          <p class="card-text">Idade: ${user.dob.age}</p>
        </div>
      </div>
    </div>`;

  $('#batatinha').html(conteudo)   

  $('#exampleModal').modal('show');
}


carregar();
