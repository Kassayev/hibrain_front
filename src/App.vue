<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" class="p-0 mb-2">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">HIBRAIN</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-button @click="nextPage('/')" variant="light" class="mr-2">Add Employee</b-button>
              <b-button @click="nextPage('/get')" variant="light">Get Employees</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    export default {
        name: 'App',
        methods:{
            nextPage(url){
                this.$router.push({path: url})
            }
        }
    }
</script>

<style>
</style>
