const Organizations = { template: `
  <div class="container">
  <div class="queryresults">
  <transition name="slide-fade"><!-- this.config.messages.summary.parameters -->
  <div v-if="this.querybindings[0]">
  <p>{{ $t(this.config.messages.summary.msgid,{num: querybindings.length})}}</p>
  <ul>
  <li v-for="(result, index) in this.querybindings">
  <span v-bind:class="{triplestorelink: result.entity.value.startsWith('http://www.wikidata.org/entity/')}" v-on:click="queryOneEntity(result.entity.value)">
  <router-link v-bind:to="'/' + config.entity + '?qid=' +  result.entity.value.split('entity/')[1]">{{ result.entityLabel.value}}</router-link>
  </span>
  </li>
  </ul>
  </div>
  <p v-else-if="this.notInital">{{ $t('notfound') }}</p>
  </transition>
  </div>
  <div class="querydetailresults" v-if="this.querybindingsoneentity[0]">
  <transition name="slide-fade">
  <div>
  <p>{{ this.querybindingsoneentity[0].entityLabel.value + ": " + $t(this.config.messages.details.msgid) }}:</p>
  <ul v-if="this.querybindingsoneentity[0].relatedEntity1 || this.querybindingsoneentity[0].relatedEntity2">
  <li v-for="(result, index) in this.querybindingsoneentity">
  <span v-if="result.relatedEntity1">{{$t(config.relatedEntity1) + ": "}}
  <router-link v-bind:to="'/' + config.relatedEntity1 + '?qid=' +  result.relatedEntity1.value.split('entity/')[1] + '&' + i18n.locale">{{ result.relatedEntity1Label.value}}</router-link>
  </span>
  <span v-if="result.relatedEntity2">{{$t(config.relatedEntity2) + ": "}}
  <router-link v-bind:to="'/' + config.relatedEntity2 + '?qid=' +  result.relatedEntity2.value.split('entity/')[1] + '&' + i18n.locale">{{
  result.relatedEntity2Label.value}}</router-link>
  </span>
  </li>
  </ul>
  <p><a v-bind:href="makeresonatorlink(this.querybindingsoneentity[0].entity.value)" target="_blank" rel="noopener noreferrer">{{$t('furtherinformation') }}</a></p>
  </div>
  </transition>
  </div>
  <div v-if="config.geoSpecificQueryID"  class="map" style="display: block; text-align: center;">
  <transition name="slide-fade">
  <div>
  <iframe style="width: 90vw; height: 50vh; border: none;" v-bind:src="makemaplink()"></iframe>
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
      querybindingsoneentity : [],
      notInital : false,
      config : {
        entity : "organizations",
        relatedEntity1 : "tools",
        relatedEntity2 : "persons",
        generalQueryID : "organizationsGeneralQuery",
        entitySpecificQueryID : "organizationsSpecificQuery",
        geoSpecificQueryID : null,/*10,*/
        messages : {
          summary : {
            msgid: "outputTemplates.TC3"
            /*parameters : JSON.parse(JSON.stringify("{num: this.querybindings.length}"))*/
          },
          details : {
            msgid : "outputTemplates.TC3Details"
          }
        },
      }
    }
  },
  beforeMount() {
    if (this.$route.query.lang) {
      i18n.locale = this.$route.query.lang
    }
    this.queryAllEntities()
    if(this.$route.query.qid)
    {
      this.qid = wikidatabase.concat(this.$route.query.qid)
      this.queryOneEntity(this.qid)
    } else ""
  },
  methods: {
    queryAllEntities() {
      this.notInital = true
      sparqlQuery = queries.find(query => query.queryID === this.config.generalQueryID).query.replace(/@@@language@@@/,i18n.locale)
      axios.post(sparqlQuery)
      .then(response => (
        this.querybindings = response.data.results.bindings
      ))
    },
    queryOneEntity(myqid) {
      this.notInital = true
      sparqlDraftQuery = queries.find(query => query.queryID === this.config.entitySpecificQueryID).query.replace(/@@@qid@@@/,myqid)
      sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
      axios.post(sparqlQuery)
      .then(response => (
        this.querybindingsoneentity = response.data.results.bindings
      ))
    },
    makemaplink() {
      var baselink = queries.find(query => query.queryID === this.config.geoSpecificQueryID).query
     console.log(baselink)
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
