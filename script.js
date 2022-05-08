let dados = []

function pegaDados(){
  console.log('pega dados funcionando');
  
  $.ajax({
    url: "https://iot.14mob.com/lista.json",
    data: "",
    success: function(retorno){
      dados = JSON.parse(retorno);
      tratarDados()
    },
    dataType: "html"
  })
}

// FUNÇÃO tratarDados CRIA OS CARDS NA PÁGINA
function tratarDados() {
  var lista = $('.listaItens')
  
  $(dados).each(function(index, valor) {
    let conteudo = `
      <div class="col-md-4">
        <div class="card" >
          <img src="${valor.imagem}" class="card-img-top" onclick="abrirModal()" alt="tertertert">
          <div class="card-body">
            <h5 class="card-title">${valor.nome}</h5>
            <p class="card-text">${valor.descricao}</p>
            <button
              type="button"
              class="btn btn-primary abrirModal"
              onclick="abrirModal('${valor.id}')"
            >
              Detalhes
            </button>
          </div>
        </div>
      </div>`;

    lista.append(conteudo);
  })
}

// ABRE O MODAL DO CARD CLICADO
function abrirModal(id) {
  const cachorroCorreto = dados.filter(el => el.id === id)[0]
  let conteudo = `
    <div class="col-md-12">
      <div class="card" >
        <img src="${cachorroCorreto.imagem}" class="card-img-top"  alt="Au au au">
        <div class="card-body">
          <h5 class="card-title">${cachorroCorreto.nome}</h5>
          <p class="card-text">${cachorroCorreto.descricao}</p>
        </div>
      </div>
    </div>`;

  $('.detalheItem').html(conteudo)   

  $('#exampleModal').modal('show');
}


$(function(){
  pegaDados();
})
