const express = require('express')
const mercadopago = require('mercadopago')
const app = express();

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-8031572461153268-060504-a391984e216d37e60e4d3217cd9a1e59-560695115'
})

app.get('/', (req,res) =>{
    res.send('ta workando papai')
})

app.get('/pagar',async (req, res) =>{
    
    var id = "" + Date.now()
    var emailPagador = 'leeolins@live.com'
    var dados = {
        items: [
            item = {
                id: id,
                quantity: 1,
                title: 'Formacao fullstack',
                currency_id: 'BRL',
                unit_price: parseFloat(197)
            }
        ],
        payer: {
            email: emailPagador
        },
        external_refence: id    
    }
    
    console.log('chegou aqui 2')
    try{
        console.log('chegou aqui 3')
        var pagamento = await mercadopago.preferences.create(dados)
        console.log(pagamento)
        console.log('chegou aqui 4')
        return res.redirect(pagamento.body.init_point)
    }catch(err){
        return res.send(err.message)
    }

})

app.listen(4000, (req,res) =>{
    console.log('ta funfando!')
} )
