
const Organizations = { template: `
  <kgtemplate
  v-bind:generalqueryid="this.config.generalqueryid"
  v-bind:entityspecificqueryid="this.config.entityspecificqueryid"
  v-bind:geospecificqueryid="this.config.mygeospecificqueryid"
  v-bind:entity="this.config.entity"
  v-bind:relatedentity1="this.config.relatedEntity1"
  v-bind:relatedEntity1Type="this.config.relatedEntity1Type"
  v-bind:relatedentity2="this.config.relatedEntity2"
  v-bind:relatedEntity2Type="this.config.relatedEntity2Type"
  v-bind:outputlocation="this.config.outputlocation"
  v-bind:message1="this.config.message1"
  v-bind:message2="this.config.message2"
  ></kgtemplate>
  `,data: function () {
    return {
      config : {
        generalqueryid : "organizationsGeneralQuery",
        entityspecificqueryid : "organizationsSpecificQuery",
        entity : "organizations",
        relatedEntity1 : "tools",
        relatedEntity2 : "persons",
        relatedEntity1Type : "url",
        relatedEntity2Type : "url",
        outputlocation : "true",
        message1 : "outputTemplates.TC3",
        message2 : "outputTemplates.TC3Details",
        mygeospecificqueryid : ""
      }
     }
  }
}
