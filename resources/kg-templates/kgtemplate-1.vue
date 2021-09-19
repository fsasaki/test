Vue.component('kgtemplate' , { template: `
  <div class="container">
  <div class="queryresults">
  <transition name="slide-fade">
  <div v-if="this.querybindings[0]">
  <p>{{ $t(message1,{num: this.querybindings.length})}}</p>
  <ul>
  <li v-for="(result, index) in this.querybindings">
  <span v-bind:class="{triplestorelink: result.entity.value.startsWith('http://www.wikidata.org/entity/')}" v-on:click="queryOneEntity(result.entity.value)">
  <router-link v-bind:to="'/' + entity + '?qid=' +  result.entity.value.split('entity/')[1]">{{ result.entityLabel.value}}</router-link>
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
  <p v-if="message2">{{ $t(message2, { entityLabel: this.querybindingsoneentity[0].entityLabel.value})}}:</p>
  <p v-if="checkIfEntityExists(this.querybindingsoneentity,'relatedEntity1')">
  <span>{{ $t(relatedentity1) + ": "}}</span>
  <span v-for="(result, index) in unique(this.querybindingsoneentity,'relatedEntity1')">
  <router-link v-if="relatedEntity1Type ==='url'" v-bind:to="'/' + relatedentity1 + '?qid=' +  result.relatedEntity1.value.split('entity/')[1] + '&' + i18n.locale">{{ result.relatedEntity1Label.value}}</router-link>
  <a v-if="relatedEntity1Type ==='externalurl'" v-bind:href="result.relatedEntity1.value">{{ result.relatedEntity1Label.value}}</a>
  <span v-if="relatedEntity1Type ==='text'">{{ result.relatedEntity1Label.value}}</span>
<!--  <span v-if="index != resultsWithoutDublicates.length - 1">, </span>-->
  </span>
  </p>
  <p v-if="checkIfEntityExists(this.querybindingsoneentity,'relatedEntity2')">
  <span>{{ $t(relatedentity2) + ": "}}</span>
  <span v-for="(result, index) in unique(this.querybindingsoneentity,'relatedEntity2')">
  <router-link v-if="relatedEntity2Type ==='url'" v-bind:to="'/' + relatedentity2 + '?qid=' +  result.relatedEntity2.value.split('entity/')[1] + '&' + i18n.locale">{{ result.relatedEntity2Label.value}}</router-link>
  <a v-if="relatedEntity2Type ==='externalurl'" v-bind:href="result.relatedEntity2.value">{{ result.relatedEntity2Label.value}}</a>
  <span v-if="relatedEntity2Type ==='text'">{{ result.relatedEntity2Label.value}}</span>
<!--  <span v-if="index != resultsWithoutDublicates.length - 1">, </span>-->
  </span>
  </p>
  <p v-if="this.querybindingsoneentity[0].location && outputlocation === 'true'">{{$t('location') + ": "}}
  <router-link v-bind:to="'/locations?qid=' +  this.querybindingsoneentity[0].location.value.split('entity/')[1] + '&' + i18n.locale">{{
    this.querybindingsoneentity[0].locationLabel.value}}</router-link>
  </p>
  <p><a v-bind:href="makeresonatorlink(this.querybindingsoneentity[0].entity.value)" target="_blank" rel="noopener noreferrer">{{$t('furtherinformation') }}</a></p>
  </div>
  </transition>
  </div>
  <div v-if="geospecificqueryid" class="map" style="display: block; text-align: center;">
  <transition name="slide-fade">
  <div>
  <iframe style="width: 90vw; height: 50vh; border: none;" v-bind:src="makemaplink()"></iframe>
  </div>
  </transition>
  </div>
  </div>
  `,
  props : ["generalqueryid", "entityspecificqueryid", "geospecificqueryid", "entity", "relatedentity1", "relatedEntity1Type", "relatedentity2", "relatedEntity2Type","outputlocation", "message1", "message2"],
  data: function () {
    return {
      qid : "",
      querybindings : [],
      querybindingsoneentity : [],
      resultsWithoutDublicates : [],
      notInital : false
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
      sparqlQuery = queries.find(query => query.queryID === this.generalqueryid).query.replace(/@@@language@@@/,i18n.locale)
      axios.post(sparqlQuery)
      .then(response => (
        this.querybindings = response.data.results.bindings
      ))
    },
    queryOneEntity(myqid) {
      this.notInital = true
      sparqlDraftQuery = queries.find(query => query.queryID === this.entityspecificqueryid).query.replace(/@@@qid@@@/,myqid)
      sparqlQuery = sparqlDraftQuery.replace(/@@@language@@@/,i18n.locale)
      axios.post(sparqlQuery)
      .then(response => (
        this.querybindingsoneentity = response.data.results.bindings
      ))
    },
    makemaplink() {
      var baselink = queries.find(query => query.queryID === this.geospecificqueryid).query
     console.log(baselink)
      var link = baselink.replace(/@@@language@@@/,i18n.locale)
      return link
    },
    makeresonatorlink(myqid) {
      var resonator = "https://reasonator.toolforge.org/?&q="
      var ID = myqid.split('entity/Q')[1]
      return resonator.concat(ID,'&lang=',i18n.locale)
    },
    checkIfEntityExists(data,key){
    var checkEntity = this.unique(data, key)
    if (checkEntity.length > 0) {
    return true}
    else {return false}
    },
    unique (data, key){
    let uniqueObjects = [];
    let uniqueKeys = []
    data.forEach(element => {
    if(element[key]){
    if(!uniqueObjects.includes(element[key].value) && !uniqueKeys.includes(element[key].value)) {
    uniqueObjects.push(element)
    uniqueKeys.push(element[key].value)
    }
    }
    })
    return uniqueObjects
      }
  }
})
