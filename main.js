
const Main = { template: `
 <div class="container">
	<header>
	  <h1>{{ $t('appTitle') }}</h1>
	  <p>{{ $t('appDescription') }}</p>
    <p>{{ $t('searchdescription') }}</p>
	  <form @submit.prevent="handleSubmit">
    <v-text-field v-model="searchkey" single-line></v-text-field>
	    <v-btn round color="grey" dark type="submit" v-on:keyup.enter="handleSubmit">{{ $t('search')}}</v-btn>
	  </form>
	</header>
  <div class="queryresults">
    <transition name="slide-fade">
      <div v-if="this.querybindings[0]">
      <ul>
      <li v-for="(result, index) in this.querybindings">
      <router-link v-bind:to="'/' + result.route.value + '?qid=' +  result.item.value.split('entity/')[1] + '&' + i18n.locale">{{ result.itemLabel.value}}</router-link>
      </li>
      </ul>
      </div>
      <div v-else-if="this.notInital"><p>{{ $t('notfound')}}</p></div>
      </transition>
	</div>
  `,data: function () {
  return {
                querybindings : [],
                optionvalues : [],
                querybindings : [],
                searchkey : "",
                notInital : false
          }
             },
               beforeMount() {
    if (this.$route.query.lang) {
      i18n.locale = this.$route.query.lang
    }
    if(this.$route.query.searchkey)
    { this.queryAllEntries(this.$route.query.searchkey.trim())
      this.searchkey = this.$route.query.searchkey
    } else ""
  },
methods: {
  handleSubmit() {
      this.notInitial = true
      this.queryAllEntries(this.searchkey.trim())
  },
  updateQuerySearchKey(mysearchkey){
      mysearchkey
      currentPath = this.$route.query
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        queries.searchkey = mysearchkey
        this.$router.replace({ query: queries });
      },
queryAllEntries(mysearchkey) {
this.notInital = true
this.updateQuerySearchKey(mysearchkey)
sparqlDraftQuery = queries[6].query.replace(/@@@searchkey@@@/,mysearchkey)
sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
axios.post(sparqlQuery)
.then(response => (
this.querybindings = response.data.results.bindings
))
}
		   }
}
