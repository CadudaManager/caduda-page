(() => {
    window.addEventListener('DOMContentLoaded',  () => {

        function getIdProduct(nomeProduto) {
            switch (nomeProduto) {
                case 'espetinhos': return 1
                case 'drinks': return 4
                case 'outros':
                default: return 5
            }
        }

        const ul = document.querySelector('[id="produto"]');

        const getProducts = async (category) => {
            await
                fetch(`http://caduda-api.herokuapp.com/api/v1/products/category/${category}`, {
                    crossDomain: true,
                    headers: {'Content-Type':'application/json'},
                })
                    .then((response) => response.json())
                    .then(data => {
                        ul.innerHTML = '';

                        data.forEach(espetinho => {
                            const li = document.createElement('li')
                            li.innerHTML = `
                                ${espetinho.name} - R$ ${espetinho.value}
                            `
                            ul.append(li)
                        })
                    })
        }


        const btnProduto = document.getElementsByClassName('btn-produto')
        Array.from(btnProduto).forEach(btn => {
            btn.addEventListener('click', async () => {
                const category = getIdProduct(btn.id)
                getProducts(category)
            })
        })

        getProducts(1);

        const star = `<svg class="star-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" width="21px" height="20px">
        <path d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
        \tl2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"/>
        </svg>`

        const listarAvaliacoes = async () => {
            await fetch(`https://localhost:7078/api/Evaluation`, {
                mode: 'no-cors',
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8080'
                },
                }
            ) .then((response) => response.json())
                .then(data => {
                    data.forEach(avaliacao => {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="" id="">
                                <span>${avaliacao.score}</span> ${star}
                                <span>${avaliacao.name}</span>
                                <span>${avaliacao.comment}</span>
                            </div>
                        `
                    })
                })
        }

        async function enviarAvaliacao() {
            const nome = document.getElementById('nome')
            const email = document.getElementById('email')
            const avaliacoes = document.getElementsByName('score')
            const comentario = document.getElementById('comentario')

            const arrayAvaliacao = Array.from(avaliacoes)
            const avaliacaoSelecionada = arrayAvaliacao.find(el => el.checked)

            await fetch('', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: {
                    name: nome.value,
                    email: email.value,
                    comment: comentario,
                    score: avaliacaoSelecionada.value
                }
            })
        }

        const divAvaliacoes = document.getElementById('avaliacoes')
        const values = [1,2,3,4,5]

        values.forEach(value => {
            const label = document.createElement('div')
            const input = document.createElement('input')
            label.innerHTML = `
                <label class="label-radio" for="radio${value}" id="label-radio-${value}">
                    <span>${value}</span> ${star}
                </label>
            `
            input.id = `radio${value}`
            input.name = "score"
            input.value = value
            input.type = 'radio'

            input.addEventListener('change', () => {
                const inputsAvaliacao = document.getElementsByName('score')
                Array.from(inputsAvaliacao).forEach(ia => {
                    if (ia.checked) {
                        const inputMarked = document.getElementById(`label-radio-${value}`)
                        inputMarked.style.border = '1px solid red'
                    } else {
                        const idLabel = ia.id.slice(5);
                        const inputMarked = document.getElementById(`label-radio-${idLabel}`)
                        inputMarked.style.border = 'none'
                    }
                })

            })

            const div = document.createElement('div')
            div.append(label)
            div.append(input)
            divAvaliacoes.append(div)
        })

        const btnEnviarAvaliacao = document.getElementById('btnAvaliacao')

        btnEnviarAvaliacao.addEventListener('click', () => {
            enviarAvaliacao()
        })

        listarAvaliacoes();
    })
})()