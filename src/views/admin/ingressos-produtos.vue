<template>
  <div>
    <h1>Ingressos/Produtos</h1>
    <div class="m-5" v-if="!$route.params.id">
      <div class="custom-layout-button">
        <RouterLink :to="`${$route.fullPath}/new`">
          <button class="btn btn-success" @click="clearData">Adicionar</button>
        </RouterLink>
      </div>
      <div>
        <b-card no-body>
          <b-tabs v-model="tabIndex" card>
            <b-tab title="Ingressos" :title-link-class="'Ingressos'">
              <tabela-com-paginacao :data="dataTickets"
                                    :fields="fieldsTickets"
                                    :count-data="countTickets"
                                    :busy="isBusyTickets"
                                    v-model:current-page="currentPageTickets"
                                    @Deletar="Deletar"
                                    @change-pagination="GetIngressos"
                                    @addDataEdit="addDataEdit">
                                  
                <template #imageURL="item">
                  <img :src="item.imageURL" width="40" height="40">
                </template>
              </tabela-com-paginacao>
            </b-tab>
            <b-tab title="Produtos" :title-link-class="'Produtos'">
              <tabela-com-paginacao :data="dataProdutos"
                                    :fields="fieldsProducts"
                                    :count-data="countData"
                                    :busy="isBusyProducts"
                                    v-model:current-page="currentPageProduct" 
                                    @change-pagination="GetProdutos"
                                    @Deletar="Deletar"
                                    @addDataEdit="addDataEdit" >
                          
                <template #imageURL="item">
                  <img :src="item.imageURL" width="40" height="40">
                </template>

              </tabela-com-paginacao>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <RouterView v-else
          @salvar="salvarUsuario"
          v-slot="{ Component }">
      <component :is="Component">
        <div class="row" v-if="!isEdit">
          <div class="col d-flex custom-input">
            <label>Tipo: *</label>
            <select v-model="tipo" :options="options">
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Nome: *</label>
            <input v-model="name" type="text" name="Nome" placeholder="Insira um titulo para venda!"  />
          </div>
          <div class="col d-flex custom-input">
            <label>Preço: *</label>
            <input v-model="price" type="text" name="Preço" placeholder="0.00"  />
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input" v-if="tipo == 1">
            <label>Categoria: *</label>
            <select v-model="category" :options="categorias">
              <option v-for="categoria in categorias" :key="categoria.value" :value="categoria.value">
                {{ categoria.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex custom-input">
            <label>Descrição: *</label>
            <b-form-textarea
              id="textarea"
              v-model="description"
              placeholder="Adicione uma descrição"
              maxlength="500"
              rows="3"
              max-rows="6" />
          </div>
        </div>
        <div class="row" v-if="tipo == 2">
          <div class="col d-flex custom-input">
            <label>Data do Evento: *</label>
            <b-form-datepicker id="example-datepicker" v-model="dateEvent" class="mb-2"></b-form-datepicker>
          </div>
        </div>
        <div class="row" v-if="tipo == 2">
          <div class="col d-flex custom-input">
            <label>Hora do Evento: *</label>
            <b-form-timepicker v-model="timeEvent" locale="pt"></b-form-timepicker>
          </div>
        </div>
        <div class="row" v-if="tipo == 2">
          <div class="col-4 d-flex custom-input">
            <label>Estado: *</label>
            <select v-model="state" type="text" name="Estado">
              <option :value="null" selected>Selecione...</option>
              <option v-for="estado in estados" :key="estado" :value="estado">{{ estado }}</option>
            </select>
          </div>
          <div class="col d-flex custom-input">
            <label>Cidade: *</label>
            <input v-model="city" type="text" name="Cidade" placeholder="Informe a cidade!"/>
          </div>
        </div>
        <div class="row" v-if="tipo == 2">
          <div class="col d-flex custom-input">
            <label>Bairro: *</label>
            <input v-model="street" type="text" name="Bairro" placeholder="Informe a vila!"/>
          </div>
          <div class="col d-flex custom-input">
            <label>Rua: *</label>
            <input v-model="bad" type="text" name="Rua" placeholder="Informe a Rua!"/>
          </div>
          <div class="col-4 d-flex custom-input">
            <label>Número: *</label>
            <input v-model="number" type="text" name="Número" placeholder="Número..."/>
          </div>
        </div>
        <div class="row" v-if="tipo == 2">
          <div class="col d-flex custom-input">
            <label>Complemento:</label>
            <input v-model="complement" type="text" name="Complemento" placeholder="Complemento"/>
          </div>
        </div>
        <div class="row" v-if="!isEdit">
          <div class="col">
            <input-anexo-arquivos @handleFiles="handleFiles" v-model:files="images" :multiple="true" classStyle="flex-column"></input-anexo-arquivos>
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-end w-100 gap-2">
            <button class="btn btn-outline-secondary" @click="cancelar">Cancelar</button>
            <button :disabled="!canSave" class="btn btn-success" @click="!isEdit ? Salvar() : Editar($route.params.id)">{{!isEdit ? 'Salvar' : 'Editar' }}</button>
          </div>
        </div>
      </component>
    </RouterView>
    <b-modal size="xl" v-model="isShowModal" title="Fotos dos Produtos">
      
    </b-modal>
  </div>
</template>

<script>
import TabelaComPaginacao from '@/components/Tabelas/TabelaComPaginacao.vue';
import ProdutosServices from '@/services/ProdutosServices.js';
import TicketServices from '@/services/TicketServices';
import inputAnexoArquivos from '@/components/inputs/inputAnexoArquivos.vue';

export default {
  name: 'IngressosProdutosAdmin',
  components: {
    TabelaComPaginacao,
    inputAnexoArquivos
  },
  data() {
    return {
      dataProdutos: null,
      dataTickets: null,
      countData: null,
      countTickets: null,
      currentPageProduct: 1,
      currentPageTickets: 1,

      // product
      category: null,

      // ticket 
      dateEvent: null,
      timeEvent: null,
      state: null,
      city: null,
      street: null,
      bad: null,
      complement: "",
      number: null,

      tipo: null,
      name: null,
      price: null,
      description: "",
      images: [],
      
      fieldsProducts: [
        { key: 'imageURL', label: 'Fotos' },
        { key: 'id', label: 'Id' },
        { key: 'price', label: 'Preço' },
        { key: 'description', label: 'Descrição' },
        { key: 'categoryName', label: 'Categoria' },
        { key: 'action', label: '' }
      ],
      fieldsTickets: [
        { key: 'imageURL', label: 'Fotos' },
        { key: 'id', label: 'Id' },
        { key: 'price', label: 'Preço' },
        { key: 'description', label: 'Descrição' },
        { key: 'dateEvent', label: 'Data do Evneto' },
        { key: 'timeEvent', label: 'Horário do Evento' },
        { key: 'action', label: '' }
      ],
      options: [
        { value: null, text: 'Selecione...' },
        { value: 1, text: 'Produtos' },
        { value: 2, text: 'Ingressos' },
      ],
      categorias: [
        { value: null, text: 'Selecione...' },
        { value: 'Roupas', text: 'Roupas' },
        { value: 'Acessórios', text: 'Acessórios' },
        { value: 'Chapéus', text: 'Chapéus' },
        { value: 'Sapatos', text: 'Sapatos' },
      ],
      estados: [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
                 'SC', 'SP', 'SE', 'TO'
      ],
      isShowModal: false,
      imagesProduct: [],
      isEdit: false,
      tabIndex: 0,
      isBusyProducts: false,
      isBusyTickets: false
    }
  },
  props: {
    Company: null,
    Usuario: null
  },
  computed: {
    canSave() {
      if (this.tipo == 1) {
        return (this.price && this.description.length > 15 && this.category && (this.isEdit || this.images.length >= 1));
      } else {
        return (this.price 
          && this.description.length > 15 
          && this.dateEvent 
          && this.timeEvent 
          && this.state 
          && this.city
          && this.street
          && this.bad
          && this.number
          && (this.isEdit || this.images.length >= 1))
      }
    },
  },
  created() {
    if (this.Company != null) {
      this.GetProdutos();
      this.GetIngressos();
    }
  },
  updated() {
    this.GetProdutos();
    this.GetIngressos();
  },
  emits: ['setLoading', "showToastSuccess", "showToastError"],
  methods: {
    async GetProdutos() {
      this.isBusyProducts = true;
      ProdutosServices.GetProdutos(this.Company?.Id, this.currentPageProduct).then(res => {
        this.dataProdutos = res.products;
        this.countData = res.countProducts
      }).catch(err => {
        console.log("GetProdutos: ", err)
      }).finally(() => {
        this.isBusyProducts = false;
      });
    },
    async GetIngressos() {
      this.isBusyTickets = true;
      TicketServices.GetTicketsAsync(this.Company?.Id, this.currentPageTickets).then(res => {
        console.log(res.tickets)
        this.dataTickets = res.tickets;
        this.countTickets = res.countTickets
      }).catch(err => {
        console.log("GetProdutos: ", err)
      }).finally(() => {
        this.isBusyTickets = false;
      });
    },
    async Salvar() {
      const imageBase64 = await this.convertToBase64(this.images[0]);
      try {
        let formData = new FormData();
        formData.append("Name", this.name);
        formData.append("Price", this.price);
        formData.append("Description", this.description);
        formData.append("CategoryName", this.category);
        formData.append("ImageBase64", imageBase64.replaceAll(/^data:image\/[a-zA-Z]+;base64,/g, ''));

        for(let index = 0; index < this.images.length; index++) {
          formData.append("Images", this.images[index]);
        }

        if (this.tipo == 1) {
          formData.append("CategoryName", this.category);
          formData.append("CompanyId", this.Company.Id);

          await ProdutosServices.SalvarProduto(formData);
        }
        else {
          formData.append("TicketsHeader.CompanyId", this.Company.Id);
          formData.append("TicketsHeader.UserId", this.Usuario.Id);
          formData.append("DateEvent", this.dateEvent);
          formData.append("TimeEvent", this.timeEvent);
          formData.append("State", this.state);
          formData.append("City", this.city);
          formData.append("Street", this.street);
          formData.append("Bad", this.bad);
          formData.append("Number", this.number);
          formData.append("Complement", this.complement ?? null);

          await TicketServices.PostAsync(formData);
        }
        this.$router.back();
        this.GetProdutos();
        
      } catch (err) {
        console.log(err);
      }
    },
    async Editar(id) {
      try {
        let formData = new FormData();
        formData.append("Name", this.name);
        formData.append("Price", this.price);
        formData.append("Description", this.description);
        formData.append("Id", id);
        if (this.tipo == 1) {
          var product = this.dataProdutos.find(item => item.id == id);
          
          formData.append("ImageURL", product['imageURL']);

          formData.append("CategoryName", this.category);
          formData.append("CompanyId", this.Company.Id);

          var dataProduto = await ProdutosServices.EditarProduto(formData)

          Object.assign(this.dataProdutos.find(item => item.id == id), dataProduto);
        } else {
          var ticket = this.dataTickets.find(item => item.id == id);
          formData.append("ImageURL", ticket['imageURL']);
          formData.append("TicketsHeader.CompanyId", this.Company.Id);
          formData.append("TicketsHeader.UserId", this.Usuario.Id);

          ticket['files'].forEach((item, index) => {
            formData.append(`Files[${index}].Id`, item.id);
            formData.append(`Files[${index}].CreatedAt`, item.createdAt);
            formData.append(`Files[${index}].UpdatedAt`, item.updatedAt);
            formData.append(`Files[${index}].Name`, item.name);
            formData.append(`Files[${index}].Url`, item.url);
            formData.append(`Files[${index}].Type`, item.type);
          })
          
          formData.append("DateEvent", this.dateEvent);
          formData.append("TimeEvent", this.timeEvent);
          formData.append("State", this.state);
          formData.append("City", this.city);
          formData.append("Street", this.street);
          formData.append("Bad", this.bad);
          formData.append("Number", this.number);
          formData.append("Complement", this.complement ?? "");
          
          var dataTicket = await TicketServices.PutAsync(formData)

          //var data = await TicketServices.PutAsync(formData);
          Object.assign(this.dataTickets.find(item => item.id == id), dataTicket);
        }
        this.$router.back();
      } catch (err) {
        console.log(err);
      }
    },
    async Deletar(id) {
      if (this.tabIndex == 0) {
        var isDeleted = await TicketServices.DeleteAsync(id);
        if (isDeleted) {
          this.$emit("showToastSuccess", "deletado com sucesso!")
          this.GetIngressos();
        } else this.$emit("showToastError", "Houve um erro ao deletar");
      } else {
        await ProdutosServices.DeletarProduto(id);
        this.GetProdutos();
      }
    },

    handleFiles(files) {
      this.images = files;
    },
    convertToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    showModal(itens) {
      this.imagesProduct = itens.filesProduct.filter(file => ["image/jpeg", "image/png"].includes(file.type));
      this.isShowModal = true;
    },
    cancelar() {
      this.clearData();
      this.$router.back();
    },
    addDataEdit(item) {
      console.log(item)
      this.tipo = this.tabIndex == 1 ? 1 : 2;
      this.name = item['name'];
      this.price = item['price'].toString().replace(".", ",");
      this.description = item['description'];
      this.category = item['categoryName'];
      this.dateEvent = item['dateEvent'];
      this.timeEvent = item['timeEvent'];
      this.state = item['state'];
      this.city = item['city'];
      this.street = item['street'];
      this.bad = item['bad'];
      this.number = item['number'];
      this.complement = item['complement'];
      this.isEdit = true;
    },
    clearData() {
      this.tipo = null;
      this.name = null;
      this.price = null;
      this.description = "";
      this.images = [];
      this.category = null;
      this.dateEvent = null;
      this.timeEvent = null;
      this.state = null;
      this.city = null;
      this.street = null;
      this.bad = null;
      this.number = null;
      this.complement = null;
      this.isEdit = false;
    },
  }
}
</script>

<style scoped>
.custom-layout-button {
  width: 100%;
  display: flex;
  justify-content: end;
  margin: 15px 0;
  padding: 0 5px;
}

.custom-input {
  flex-direction: column;
  align-items: flex-start;
}

.custom-input input, select, textarea {
  height: 30px;
  width: 100%;
  padding: 0 6px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

img {
  object-fit: contain;
}
</style>