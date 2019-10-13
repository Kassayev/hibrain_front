<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols="3">
        <b-row>
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
          <b-col cols="12" class="mb-2">
            <b-button variant="success" @click="addEmployee()">add</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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
                employee: {
                    firstName: null,
                    lastName: null,
                    patronymic: null,
                    telephone: null,
                    email: null,
                    country: null,
                    city: null
                },
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

                ]
            }
        },
        mounted() {
        },
        methods: {
            addEmployee() {
                var self = this;

                self.axios.post('http://localhost:8080/api/employees', self.employee, self.head).then((response) => {
                    console.log(response.data)
                })
            }
        }
    }
</script>
<style scoped>

</style>
