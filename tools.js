const Tools = { template: `
 <div class="container">
	  <div class="queryresults">
	    <transition name="slide-fade">
	      <div v-if="this.querybindings[0]">
        <p>{{ $t('outputTemplates.TC8', {num: querybindings.length})}}</p>
        <ul>
		    <li v-for="(result, index) in this.querybindings">
        <span v-bind:class="{triplestorelink: result.tool.value.startsWith('http://www.wikidata.org/entity/')}" v-on:click="queryOneTool(result.tool.value)">
        <router-link v-bind:to="'/tools?qid=' +  result.tool.value.split('entity/')[1]">{{ result.toolLabel.value}}</router-link>
        </span>
		    </li>
        </ul>
	      </div>
	      <p v-else-if="this.notInital">{{ $t('notfound') }}</p>
	    </transition>
	  </div>
    <div class="querydetailresults" v-if="this.querybindingsonetool[0]">
    <transition name="slide-fade">
    <div>
    <ul>
    <li>{{ $t('homepage') }}: <span v-if="this.querybindingsonetool[0].webpageLabel.value"><a v-bind:href="this.querybindingsonetool[0].webpageLabel.value" target="_blank" rel="noopener noreferrer">{{this.querybindingsonetool[0].webpageLabel.value}}</a></span></li>
    <li><a v-bind:href="makeresonatorlink(this.querybindingsonetool[0].tool.value)" target="_blank" rel="noopener noreferrer">{{$t('furtherinformation') }}</a></li>
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
                querybindingsonetool : [],
   				     notInital : false,
             }
           },
             beforeMount() {
               if (this.$route.query.lang) {
                 i18n.locale = this.$route.query.lang
               }
                this.queryAllTools()
                if(this.$route.query.qid)
                {
                  this.qid = wikidatabase.concat(this.$route.query.qid)
                  this.queryOneTool(this.qid)
                } else ""
              },
       methods: {
         queryAllTools() {
           this.notInital = true
           sparqlQuery = queries[2].query.replace(/@@@language@@@/,i18n.locale)
         axios.post(sparqlQuery)
       .then(response => (
           this.querybindings = response.data.results.bindings
       ))
     },
       queryOneTool(myqid) {
         this.notInital = true
         sparqlDraftQuery = queries[3].query.replace(/@@@qid@@@/,myqid)
         sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
              axios.post(sparqlQuery)
     .then(response => (
           this.querybindingsonetool = response.data.results.bindings
       ))
   },
   makeresonatorlink(myqid) {
     var resonator = "https://reasonator.toolforge.org/?&q="
     var ID = myqid.split('entity/Q')[1] /*http://www.wikidata.org/entity/Q108296278 */
     return resonator.concat(ID,'&lang=',i18n.locale)
   }
}
}
