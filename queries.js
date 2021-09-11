const queries =
[
  {
"queryID" : "TC1",
"query" : "https://query.wikidata.org/sparql?query=SELECT%20%3Fperson%20%3FpersonLabel%0AWHERE%20%0A%7B%0A%20%20%7B%0A%20%20%3Fperson%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%20%20%20%7D%0A%20%20UNION%0A%20%20%7B%0A%20%20%20%20%3Fperson%20wdt%3AP2650%20wd%3AQ55523846.%0A%20%20%20%20%7D%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D%0AORDER%20BY%20%3FpersonLabel"
},
{
"queryID" : "TC1Details",
"query" : "https://query.wikidata.org/sparql?query=SELECT%20%3Fperson%20%3FpersonLabel%20%3FoccupationLabel%20%3FworkLocation%20%3FworkLocationLabel%0AWHERE%20%0A%7B%0A%20%20VALUES%20%3Fperson%20%7B%0A%20%20%20%20%3C@@@qid@@@%3E%0A%20%20%20%20%7D%0A%3Fperson%20wdt%3AP106%20%3Foccupation.%0A%20%20%20%20%20%20%20OPTIONAL%20%7B%20%3Fperson%20wdt%3AP937%20%3FworkLocation.%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D"
},
{
  "queryID" : "TC8",
  "query" : "https://query.wikidata.org/sparql?query=SELECT%20%3Ftool%20%3FtoolLabel%0AWHERE%20%0A%7B%0A%20%20%7B%0A%20%20%3Ftool%20wdt%3AP366%20wd%3AQ55523846.%0A%20%20%20%20%7D%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D%0AORDER%20BY%20%3FtoolLabel"
},
{
"queryID" : "TC8Details",
"query" : "https://query.wikidata.org/sparql?query=SELECT%20%3Fwebpage%20%3FwebpageLabel%20%3Ftool%20%0AWHERE%20%0A%7B%0A%20%20VALUES%20%3Ftool%20%7B%0A%20%20%20%20%3C@@@qid@@@%3E%20%20%20%20%7D%0A%20%20%7B%0A%20%20%3Ftool%20wdt%3AP856%20%3Fwebpage.%0A%20%20%20%20%7D%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D"
},
{
  "queryID" : "TC2",
  "query" : "https://query.wikidata.org/sparql?query=SELECT%20distinct%20%3Flocation%20%3FlocationLabel%0AWHERE%20%0A%7B%0A%20%20%3Fperson%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%3Fperson%20wdt%3AP937%20%3Flocation.%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D%0AORDER%20BY%20%3FlocationLabel"
},
{
  "queryID" : "TC2Details",
  "query" : "https://query.wikidata.org/sparql?query=SELECT%20distinct%20%3Fperson%20%3FpersonLabel%0AWHERE%20%0A%7B%0A%20%20VALUES%20%3Flocation%20%7B%0A%20%20%20%20%3C@@@qid@@@%3E%20%20%20%20%7D%0A%20%20%3Fperson%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%3Fperson%20wdt%3AP937%20%3Flocation.%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%7D%0AORDER%20BY%20%3FpersonLabel"
},
{ "queryID" : "generalQuery",
  "query" : "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3Froute%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Amwapi%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Aendpoint%20%22www.wikidata.org%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20wikibase%3Aapi%20%22EntitySearch%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mwapi%3Asearch%20%22@@@searchkey@@@%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mwapi%3Alanguage%20%22de%22.%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Fitem%20wikibase%3AapiOutputItem%20mwapi%3Aitem.%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20BIND(IF(%3FitemCategorie%20%3D%20wd%3AQ5%2C%22persons%22%2CIF(%3FitemCategorie%20%3D%20wd%3AQ7397%2C%22tools%22%2CIF(%3FitemCategorie%20%3D%20wd%3AQ618123%2C%22locations%22%2C%27%27)))%20AS%20%3Froute)%0A%20%20%7B%0A%20%20BIND(wd%3AQ5%20as%20%3FtestCategorie)%0A%20%20%3Fitem%20wdt%3AP2650%20wd%3AQ1814648%3B%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%7D%20%20%20%20%20%20%20%20%20%0A%20%20UNION%0A%20%20%7B%0A%20%20BIND(wd%3AQ7397%20as%20%3FtestCategorie)%0A%20%20%3Fitem%20wdt%3AP366%20wd%3AQ55523846%3B%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%20%20%7D%0A%20%20%20%20UNION%0A%20%20%7B%0A%20%20BIND(wd%3AQ618123%20as%20%3FtestCategorie)%0A%20%20%3Fperson%20wdt%3AP937%20%3Fitem%3B%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%20%20%3Fitem%20%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%20%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%20%20%20%20%20%20%7D%20%0A%20%20%20%20%20%20%20%0A%20%20%0A"},
  {
    "queryID" : "generalQuery2",
    "query" : "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3Froute%20WHERE%20%7B%0A%20%20%20%20%20BIND(IF(%3FitemCategorie%20%3D%20wd%3AQ5%2C%22persons%22%2CIF(%3FitemCategorie%20%3D%20wd%3AQ7397%2C%22tools%22%2CIF(%3FitemCategorie%20%3D%20wd%3AQ618123%2C%22locations%22%2C'')))%20AS%20%3Froute)%0A%20%20%7B%0A%20%20BIND(wd%3AQ5%20as%20%3FtestCategorie)%0A%20%20%3Fitem%20wdt%3AP2650%20wd%3AQ1814648%3B%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%7D%20%20%20%20%20%20%20%20%20%0A%20%20UNION%0A%20%20%7B%0A%20%20BIND(wd%3AQ7397%20as%20%3FtestCategorie)%0A%20%20%3Fitem%20wdt%3AP366%20wd%3AQ55523846%3B%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%20%20%7D%0A%20%20%20%20UNION%0A%20%20%7B%0A%20%20BIND(wd%3AQ618123%20as%20%3FtestCategorie)%0A%20%20%3Fperson%20wdt%3AP937%20%3Fitem%3B%20wdt%3AP2650%20wd%3AQ1814648.%0A%20%20%20%3Fitem%20%20wdt%3AP31%2Fwdt%3AP279*%20%3FitemCategorie.%0A%20%20FILTER%20%20(%3FitemCategorie%20%3D%20%3FtestCategorie)%0A%20%20%20%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22@@@language@@@%2C%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%20%20%20%20%20%20%7D%20%0A%20%20%20%20%20%20%20ORDER%20BY%20%3FitemLabel%0A%20%20%0A"
  }
]
