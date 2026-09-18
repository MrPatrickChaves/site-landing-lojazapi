# Loja Sabrine — catálogo e pedido via WhatsApp

Projeto estático responsivo, pronto para Netlify ou VPS/Nginx.

## Onde alterar o WhatsApp da Sabrine
Abra `config.js` e troque `sellerWhatsapp` pelo número real no formato:

`55 + DDD + número`, somente números.

Exemplo:
```js
sellerWhatsapp: "5521999999999"
```

## Onde cadastrar produtos e preços
Abra o arquivo `products.js`.

Cada produto segue este formato:
```js
{
  id: 'sabonete-rosa-verde',
  name: 'Sabonete Rosa Verde',
  category: 'Sabonetes',
  price: 12.00,
  image: './assets/products/sabonete-rosa-verde.png',
  description: 'Descrição do produto.'
}
```

Para mudar o preço, altere apenas `price`.
Para trocar a foto, altere `image`.
Para adicionar outro produto, copie um bloco inteiro, cole antes do fechamento `];` e use um `id` diferente.

## Como o carrinho funciona
O carrinho é salvo no `localStorage` do próprio navegador. Portanto, clientes diferentes e dispositivos diferentes mantêm pedidos separados, mesmo usando o site simultaneamente.

## Fluxo de pedido
1. Cliente escolhe produtos.
2. Carrinho salva localmente.
3. Cliente informa nome, WhatsApp e endereço.
4. O site abre uma mensagem pronta no WhatsApp da Sabrine.
5. O site mostra uma tela de agradecimento.
6. Ao clicar em OK ou fechar, o carrinho é limpo e o cliente volta para o início.

Observação: um site comum não consegue confirmar tecnicamente que o usuário realmente apertou "Enviar" dentro do WhatsApp. A confirmação aparece depois que o WhatsApp é aberto e orienta o cliente a clicar em OK depois do envio.

## Publicação
### Netlify
Envie os arquivos da raiz do projeto. Não é necessário backend.

### VPS/Nginx
Copie os arquivos para o diretório público configurado no Nginx, por exemplo `/var/www/sabrine`.

## Crédito e divulgação do serviço

O rodapé exibe **Desenvolvido por Patrick Chaves** e **Hospedado por Zorbiun**. Os dois créditos, assim como o bloco **“Você também pode ter uma página como esta”**, abrem um pop-up comercial com contato para o WhatsApp **(11) 94027-1034**.

A mensagem comercial pode ser alterada no arquivo `app.js`, nas constantes `SERVICE_WHATSAPP` e `SERVICE_MESSAGE`.


## Publicação no Netlify

Esta versão é estática e não precisa instalar Node, React ou executar `npm run build`. No Netlify, publique a pasta do projeto diretamente; o arquivo `netlify.toml` já define `publish = "."`.


## Como usar imagens reais nos produtos

Nesta versão, os produtos agora usam **fotos reais** em vez de emoji/ícones.

### Onde ficam as imagens
- `assets/products/` → usado pela versão estática
- `public/assets/products/` → usado pela versão React/Vite

### Onde cadastrar produto, preço e imagem
Edite o arquivo `products.js`.

Exemplo:
```js
{
  id: 'sabonete-rosa-verde',
  name: 'Sabonete Rosa Verde',
  category: 'Sabonetes',
  price: 12.00,
  image: './assets/products/sabonete-rosa-verde.png',
  description: 'Sabonete artesanal em formato de rosa.'
}
```

Se quiser trocar a foto, basta colocar a nova imagem dentro de `assets/products/` e alterar o campo `image`.


## Importante: ID único por produto

Cada produto precisa ter um `id` exclusivo. Não repita o mesmo `id` em dois produtos, pois o carrinho usa esse campo como chave. Esta versão também possui uma proteção em `app.js` contra duplicidades acidentais.
