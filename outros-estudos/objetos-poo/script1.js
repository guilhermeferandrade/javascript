class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = []; //Cria um vetor vazio
        this.editId = null
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto) == true) {
            if (this.editId == null) {
                this.adicionar(produto)
            } else {
                this.atualizar(this.editId, produto)
            }
        }

        this.listaTabela() //Cria a tabela no site
        this.cancelar() //Limpa o campo após mostrar a tabela
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = '' //Limpa o body para não duplicar o conteúdo

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();  //Cria a linha da tabela (tr)

            let td_id = tr.insertCell(); //Cria a coluna da tabela (td)
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id; //Mostra o ID
            td_produto.innerText = this.arrayProdutos[i].nomeProduto; //Mostra o nome do produto
            td_valor.innerText = this.arrayProdutos[i].preco; //Mostra o preço do produto

            td_id.classList.add('center'); //Adiciona a classe center no td_id

            let imgEdit = document.createElement('img'); //Cria o elemento img
            imgEdit.src = 'imagens/edit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdit("+ JSON.stringify(this.arrayProdutos[i]) +")")

            let imgDelete = document.createElement('img');
            imgDelete.src = 'imagens/bin.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")"); //Adiciona o evento "onclick" no imgDelete, com a ação de chamar a função de deletar passando o id do produto, para poder deletar especificamente aquele produto

            td_acoes.appendChild(imgEdit); //Coloca o elemento img criado no td_acoes
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto) //Adiciona o produto no vetor
        this.id++ //Acrescenta 1 no ID
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    preparaEdit(dados) {
        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('preco').value = dados.preco

        document.getElementById('btn1').innerText = 'Atualizar'
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

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id) {
        if (confirm(`Deseja realmente deletar o produto do ID ${id}?`)) {
            let tbody = document.getElementById('tbody')

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1) //Splice para deletar o dado do array
                    tbody.deleteRow(i) //Deleta a linha do produto que o botão de excluir foi apertado
                }
            }
        }
    }
}

var produto = new Produto() //Cria um objeto da classe Produto