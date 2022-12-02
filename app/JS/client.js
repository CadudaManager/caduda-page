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
                                ${espetinho.name} - R$${espetinho.value}
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
    })
})()