
const Persons = { template: `
  <test geospecificqueryid=""
  generalqueryid="personsGeneralQuery"
  entityspecificqueryid="personsDetailedQuery"
  entity="persons"
  relatedentity1="locations"
  relatedEntity1Type="url"
  relatedentity2="job"
  relatedEntity2Type="text"
  outputlocation="false"
  message1="outputTemplates.TC1""
  message2=""
  ></test>
  `,data: function () {
    return { }
  }
}
