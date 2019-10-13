<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols="8">
        <b-input placeholder="Search" v-model="query" @input="searchEmployee(query)" class="mb-2"></b-input>
      </b-col>
      <b-col cols="8">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>ФИО</b-th>
              <b-th>Phone</b-th>
              <b-th>Email</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-if="resdoc" v-for="(doc, index) in resdoc" :key="index" @click="showModal(index)">
              <b-td>{{doc.firstName + ' ' +  doc.lastName}}</b-td>
              <b-td>{{doc.telephone}}</b-td>
              <b-td>{{doc.email}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-modal v-model="modal" title="Edit" v-if="employee">
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="12" class="mb-2">
            <b-input placeholder="Имя" v-model="employee.firstName"></b-input>
          </b-col>
          <b-col cols="12" class="mb-2">
            <b-input placeholder="Фамилия" v-model="employee.lastName"></b-input>
          </b-col>
          <b-col cols="12" class="mb-2">
            <b-input placeholder="Отчество" v-model="employee.patronymic"></b-input>
          </b-col>
          <b-col cols="12" class="mb-2">
            <b-input placeholder="Телефон" v-model="employee.telephone"></b-input>
          </b-col>
          <b-col cols="12" class="mb-2">
            <b-input placeholder="e-mail" v-model="employee.email"></b-input>
          </b-col>
          <b-col cols="12" class="mb-2">
            <b-form-select v-model="employee.country">
              <option :value="null">Выберите страну</option>
              <option v-for="(country, index) in countries" :key="index">{{country.name}}</option>
            </b-form-select>
          </b-col>
          <b-col cols="12" class="mb-2" v-if="employee.country">
            <template v-for="country in countries" v-if="country.name === employee.country">
              <b-form-select v-model="employee.city">
                <option :value="null">Выберите город</option>
                <option v-for="(city, index) in country.cities" :key="index">{{city}}</option>
              </b-form-select>
            </template>
          </b-col>
        </b-row>
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            class="float-right"
            @click="saveDoc(employee.id)"
          >
            Save
          </b-button>

          <b-button
            class="float-right mr-2"
            @click="deleteDoc(employee.id)"
            variant="danger"
          >
            delete
          </b-button>

          <b-button
            class="float-right mr-2"
            @click="modal=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </b-container>
</template>
<script>
    export default {
        data() {
            return {
                head: {
                    headers: {
                        crossDomain: true,
                        'Content-Type': 'application/json'
                    }
                },
                resdoc: [],
                resdocSort: null,
                modal: false,
                employee: null,
                countries: [
                    {
                        name: 'Kazakhstan',
                        cities: [
                            'Aktobe',
                            'Nur-sultan',
                            'West Kazakhstan region',
                            'Almaty',
                            'South Kazakhstan region',
                            'East Kazakhstan region',
                            'Shymkent',
                            'North Kazakhstan region'
                        ]
                    },
                    {
                        name: 'Russian',
                        cities: [
                            'Moscow',
                            'Saint-Petersburg',
                            'Sochi',
                            'Adler',
                            'Krasnodar'
                        ]
                    },
                    {
                        name: 'USA',
                        cities: [
                            'Los-Angels',
                            'New York',
                            'Washington',
                            'California'
                        ]
                    },
                ],
                query: ''
            }
        },
        mounted() {
            this.getDocs()
        },
        methods: {
            getDocs() {
                this.axios.get('http://localhost:8080/api/employees', this.head).then((response) => {
                    this.resdocSort = response.data;
                    this.searchEmployee(this.query);
                })
            },
            showModal(id){
                this.employee = Object.assign({},this.resdoc[id]);
                this.modal = true;
            },
            saveDoc(id){
                this.axios.put('http://localhost:8080/api/employee/' + id, this.employee,this.head).then((response) => {
                    console.log(response.data);
                    this.getDocs();
                })
            },
            deleteDoc(id){
                this.axios.delete('http://localhost:8080/api/employee/' + id,this.head).then((response) => {
                    this.modal = false;
                    this.getDocs();
                    console.log(response.data);
                })
            },
            searchEmployee(inputed){
                var self = this;
                self.resdoc = [];
                var second = inputed.toLowerCase();
                //console.log(inputed);
                for(var i = 0; i < self.resdocSort.length; i++){
                    var first = self.resdocSort[i].firstName.toLowerCase() + ' ' + self.resdocSort[i].lastName.toLowerCase();
                    if(first.indexOf(second) + 1) {
                        self.resdoc.push(self.resdocSort[i])
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
