<template>
  <div class="footer">
    <table>
      <tr>
        <th>Sobre o</th>
        <th>Minha Conta</th>
      </tr>
      <tr>
        <td><span>LionTickets</span></td>
        <td><span>Entrar</span></td>
      </tr>
      <tr>
        <td><span>Compras</span></td>
      </tr>
      <tr>
        <td><span>Carrinho</span></td>
      </tr>
      <tr>
        <td><span>Cupom</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  grid-area: footer;
  height: 250px;
  background-color: rgb(58, 58, 58);
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 15px 15px 0 15px;
}

table {
  text-align: start;
}

table tr th, table tr td {
  padding: 0 25px;
}

table tr th {
  padding-bottom: 15px;
}

table tr td {
  color: rgba(255, 255, 255, 0.5);
}

  table tr td span:hover {
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
</style>