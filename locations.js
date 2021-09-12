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
    <p>{{ $t('activepersons', {location : this.querybindingsonelocation[0].locationLabel.value}) }}:</p>
    <ul>
    <li v-for="(result, index) in this.querybindingsonelocation">
    <router-link v-bind:to="'/persons?qid=' +  result.person.value.split('entity/')[1] + '&' + i18n.locale">{{ result.personLabel.value}}</router-link>
    </li>
    <li><a v-bind:href="makeresonatorlink(this.querybindingsonelocation[0].location.value)" target="_blank" rel="noopener noreferrer">{{$t('furtherinformation') }}</a></li>
    </ul>
    </div>
    </transition>
    </div>
    <div class="map">
    <transition name="slide-fade">
    <iframe style="width: 80vw; height: 50vh; border: none;" v-bind:src="makemaplink()"></iframe>
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
   makemaplink() {
     var baselink = "https://query.wikidata.org/embed.html#%23defaultView%3AMap%0ASELECT%20distinct%20%3Flocation%20%3FlocationLabel%20%3Fcoordinates%0AWHERE%20%0A%7B%0A%20%20%3Fperson%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%3Fperson%20wdt%3AP937%20%3Flocation.%20%0A%20%20%3Flocation%20wdt%3AP625%20%3Fcoordinates%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D%0AORDER%20BY%20%3FlocationLabel"
     var link = baselink.replace(/@@@language@@@/,i18n.locale)
     return link
   },
   makeresonatorlink(myqid) {
     var resonator = "https://reasonator.toolforge.org/?&q="
     var ID = myqid.split('entity/Q')[1] /*http://www.wikidata.org/entity/Q108296278 */
     return resonator.concat(ID,'&lang=',i18n.locale)
   }
}
}
