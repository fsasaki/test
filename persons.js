const Persons = { template: `
 <div class="container">
	  <div class="queryresults">
	    <transition name="slide-fade">
	      <div v-if="this.querybindings[0]">
        <p>{{ $t('outputTemplates.TC1', {num: querybindings.length})}}</p>
        <ul>
		    <li v-for="(result, index) in this.querybindings">
        <span v-bind:class="{triplestorelink: result.person.value.startsWith('http://www.wikidata.org/entity/')}" v-on:click="queryOnePerson(result.person.value)">
        <router-link v-bind:to="'/persons?qid=' +  result.person.value.split('entity/')[1]">{{ result.personLabel.value}}</router-link>
        </span>
		    </li>
        </ul>
	      </div>
	      <p v-else-if="this.notInital">{{ $t('notfound') }}</p>
	    </transition>
	  </div>
    <div class="querydetailresults" v-if="this.querybindingsoneperson[0]">
    <transition name="slide-fade">
    <div>
    <ul>
    <li>{{ $t('personname') }}: <span v-if="this.querybindingsoneperson[0].personLabel.value">{{this.querybindingsoneperson[0].personLabel.value}}</span></li>
    <li v-if="this.querybindingsoneperson[0].occupation">{{ $t('job') }}: <span>{{this.querybindingsoneperson[0].occupationLabel.value}}</span></li>
    <li v-if="this.querybindingsoneperson[0].workLocationLabel">{{ $t('joblocation') }}:
    <router-link v-bind:to="'/locations?qid=' +  this.querybindingsoneperson[0].workLocation.value.split('entity/')[1] + '&' + i18n.locale">{{ this.querybindingsoneperson[0].workLocationLabel.value}}</router-link>
    </li>
    <li><a v-bind:href="makeresonatorlink(this.querybindingsoneperson[0].person.value)" target="_blank" rel="noopener noreferrer">{{$t('furtherinformation') }}</a></li>
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
                querybindingsoneperson : [],
   				     notInital : false,
             }
           },
             beforeMount() {
               if (this.$route.query.lang) {
                 i18n.locale = this.$route.query.lang
               }
                this.queryAllPersons()
                if(this.$route.query.qid)
                {
                  this.qid = wikidatabase.concat(this.$route.query.qid)
                  this.queryOnePerson(this.qid)
                } else ""
              },
       methods: {
         queryAllPersons() {
           this.notInital = true
           sparqlQuery = queries[0].query
         axios.post(sparqlQuery)
       .then(response => (
           this.querybindings = response.data.results.bindings
       ))
     },
       queryOnePerson(myqid) {
         this.notInital = true
         sparqlDraftQuery = queries[1].query.replace(/@@@qid@@@/,myqid)
         sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
              axios.post(sparqlQuery)
     .then(response => (
           this.querybindingsoneperson = response.data.results.bindings
       ))
   },
   makeresonatorlink(myqid) {
     var resonator = "https://reasonator.toolforge.org/?&q="
     var ID = myqid.split('entity/Q')[1] /*http://www.wikidata.org/entity/Q108296278 */
     return resonator.concat(ID,'&lang=',i18n.locale)
   }
}
}
