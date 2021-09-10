const Locations = { template: `
 <div class="container">
	  <div class="queryresults">
	    <transition name="slide-fade">
	      <div v-if="this.querybindings[0]">
        <p>{{ $t('outputTemplates.TC2', {num: querybindings.length})}}</p>
        <ul>
		    <li v-for="(result, index) in this.querybindings">
        <span v-bind:class="{triplestorelink: result.location.value.startsWith('http://www.wikidata.org/entity/')}" v-on:click="queryOneLocation(result.location.value)">
        <router-link v-bind:to="'/locations?qid=' +  result.location.value.split('entity/')[1]">{{ result.locationLabel.value}}</router-link>
        </span>
		    </li>
        </ul>
	      </div>
	      <p v-else-if="this.notInital">{{ $t('notfound') }}</p>
	    </transition>
	  </div>
    <div class="querydetailresults" v-if="this.querybindingsonelocation[0]">
    <transition name="slide-fade">
    <div>
    <p>{{ $t('activepersons') }}:</p>
    <ul>
    <li v-for="(result, index) in this.querybindingsonelocation">
    <router-link v-bind:to="'/persons?qid=' +  result.person.value.split('entity/')[1] + '&' + i18n.locale">{{ result.personLabel.value}}</router-link>
    </li>
    </ul>
    </div>
    </transition>
    </div>
	</div>
`,
data: function () {
return {
           	    sparqlParams: [],
                qid : "",
           	    options: [],
                querybindings : [],
                querybindingsonelocation : [],
   				     notInital : false,
             }
           },
             beforeMount() {

               if (this.$route.query.lang) {
                 i18n.locale = this.$route.query.lang
               }
                this.queryAllLocations()
                if(this.$route.query.qid)
                {
                  this.qid = wikidatabase.concat(this.$route.query.qid)
                  this.queryOneLocation(this.qid)
                } else ""
              },
       methods: {
         queryAllLocations() {
           this.notInital = true
           sparqlQuery = queries[4].query.replace(/@@@language@@@/,i18n.locale)
         axios.post(sparqlQuery)
       .then(response => (
           this.querybindings = response.data.results.bindings
       ))
     },
       queryOneLocation(myqid) {
         this.notInital = true
         sparqlDraftQuery = queries[5].query.replace(/@@@qid@@@/,myqid)
         sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
              axios.post(sparqlQuery)
     .then(response => (
           this.querybindingsonelocation = response.data.results.bindings
       ))
   },
   makeresonatorlink(myqid) {
     var resonator = "https://reasonator.toolforge.org/?&q="
     var ID = myqid.split('entity/Q')[1] /*http://www.wikidata.org/entity/Q108296278 */
     return resonator.concat(ID,'&lang=',i18n.locale)
   }
}
}
