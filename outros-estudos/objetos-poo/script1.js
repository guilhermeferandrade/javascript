class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = []; //Cria um vetor vazio
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto) == true) {
            this.adicionar(produto)
        }

        this.listaTabela() //Cria a tabela no site
        this.cancelar() //Limpa o campo após mostrar a tabela
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = '' //Limpa o body para não duplicar o conteúdo

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()  //Cria a linha da tabela (tr)

            let td_id = tr.insertCell() //Cria a coluna da tabela (td)
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id //Mostra o ID
            td_produto.innerText = this.arrayProdutos[i].nomeProduto //Mostra o nome do produto
            td_valor.innerText = this.arrayProdutos[i].preco //Mostra o preço do produto

            td_id.classList.add('center') //Adiciona a classe center no td_id

            let imgEdit = document.createElement('img') //Cria o elemento img
            imgEdit.src = 'imagens/edit.png'

            let imgDelte = document.createElement('img')
            imgDelete.src = 'imagens/bin.png'

            td_acoes.appendChild('imgEdit') //Coloca o elemento img criado no td_acoes
            td_acoes.appendChild('imgDelete')
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto) //Adiciona o produto no vetor
        this.id++ //Acrescenta 1 no ID
    }
    
    lerDados() {
        let produto = {} //Cria como um objeto

        produto.id = this.id //Recebe o ID do construtor
        produto.nomeProduto = document.getElementById('produto').value //Recebe o dado enviado pelo usuário
        produto.preco = document.getElementById('preco').value

        return produto;
    }

    validaCampos(produto) {
        let msg = ''; //Deixa a mensagem vazia

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n'  //Caso o nome esteja vazio, coloca essa mensagem
        }

        if (produto.preco == '') {
            msg += '- Infome o preço do produto \n' //Caso o preço esteja vazio, coloca essa mensagem
        }

        if (msg != '') {
            alert(msg) //Mostra a mensagem que estiver no "msg"
            return false
        }

        return true
    }

    cancelar() {
        document.getElementById('produto').value = '' //Limpa a caixa de texto do nome do produto
        document.getElementById('preco').value = '' //Limpa a caixa de texto do preço do produto
    }
}

var produto = new Produto() //Cria um objeto da classe Produto