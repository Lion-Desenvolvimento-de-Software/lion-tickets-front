<template>
  <div id="profile-company">
    <div class="layout">
      <div class="profile-company-image">
        <b-img v-bind="{ blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' }" rounded="circle" alt="Circle image" id="company-image" class="p-0"></b-img>
        <span class="btn custom-circle-add-image">
          <font-awesome-icon :icon="['fas', 'camera']" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EmpresaService from '@/services/admin/empresaService.js';
import Company from '@/assets/classes/Company.js';

export default {
  name: "Company",
  data() {
    return  {
      company: null
    }
  },
  created() {
    this.company = new Company();
    this.GetCompany();
  },
  methods: {
    async GetCompany() {
      var company = await EmpresaService.getEmpresaById(this.$route.params.id);
      this.company.AddData({
        Id: company?.id,
        Nome: company?.nome,
        CNPJ: company?.cnpj
      })
    }
  }
}
</script>

<style scoped>
#profile-company {
  height: 100vh;
}
.layout {
  position: relative;
  
}
.profile-company-image {
  display: flex;
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
}

#company-image ~ .custom-circle-add-image:hover {
  background: rgba(777, 777, 777, 0.5);
}

  #company-image ~ .custom-circle-add-image:hover svg {
    visibility: visible;
  }

.custom-circle-add-image {
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  z-index: 25;
  align-content: center;
}

.custom-circle-add-image svg {
  visibility: hidden;
}
</style>