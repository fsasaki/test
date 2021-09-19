const Locations = { template: `
  <test geospecificqueryid=""
  generalqueryid="locationGeneralQuery"
  entityspecificqueryid="locationsDetailedQuery"
  geospecificqueryid="geoQueryLocationsEmbedded"
  entity="locations"
  relatedentity1="persons"
  relatedEntity1Type="url"
  relatedentity2="organizations"
  relatedEntity2Type="url"
  outputlocation="false"
  message1="outputTemplates.TC2"
  message2="outputTemplates.TC2Details"
  ></test>
  `,data: function () {
    return { }
  }
}
