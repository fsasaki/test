
const Organizations = { template: `
  <kgtemplate geospecificqueryid=""
  generalqueryid="organizationsGeneralQuery"
  entityspecificqueryid="organizationsSpecificQuery"
  entity="organizations"
  relatedentity1="tools"
  relatedEntity1Type="url"
  relatedentity2="persons"
  relatedEntity2Type="url"
  outputlocation="true"
  message1="outputTemplates.TC3""
  message2="outputTemplates.TC3Details"
  ></kgtemplate>
  `,data: function () {
    return { }
  }
}
