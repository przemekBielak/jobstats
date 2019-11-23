const updateLanguages = requirements => {
  const names = [
    "kotlin",
    "java",
    "sql",
    "python",
    "html",
    "css",
    "embedded",
    "c#",
    "ruby",
    "php",
    "objective-c",
    "swift",
    "assembly",
    "r",
    "vba",
    "scala",
    "rust",
    "dart",
    "elixir",
    "clojure",
    "webassembly",
    "haskell",
    "f#",
    "erlang"
  ].sort();

  const javascriptNames = [".js", "es6", "js", "javascript"].sort();
  const typescriptNames = ["typescript", "ts", ".ts"].sort();
  const cNames = ["c/c++", "c", "low level c"].sort();
  const cppNames = ["c/c++", "c++"].sort();
  const goNames = ["go", "golang", "go lang"].sort();

  let filteredNames = requirements.filter(value => names.includes(value));
  if (
    requirements.filter(value => javascriptNames.includes(value)).length > 0
  ) {
    filteredNames.push("javascript");
  }

  if (
    requirements.filter(value => typescriptNames.includes(value)).length > 0
  ) {
    filteredNames.push("typescript");
  }

  if (requirements.filter(value => cNames.includes(value)).length > 0) {
    filteredNames.push("c");
  }

  if (requirements.filter(value => cppNames.includes(value)).length > 0) {
    filteredNames.push("c++");
  }

  if (requirements.filter(value => goNames.includes(value)).length > 0) {
    filteredNames.push("go");
  }

  return filteredNames;
};

const updateDb = requirements => {
  const names = [
    "mysql",
    "sqlite",
    "redis",
    "mariadb",
    "elasticsearch",
    "firebase",
    "dynamodb",
    "cassandra",
    "couchbase",
    "graphql"
  ];
  const mongoName = ["mongodb", "mongo", "mongo db"];
  const postgreName = ["postgresql", "postgres", "postgre", "psql"];
  const windowsServerName = [
    "windows server",
    "microsoft sql server",
    "sql server",
    "mssql"
  ];
  const oracleName = ["oracle db", "oracle"];

  let filteredNames = requirements.filter(value => names.includes(value));
  if (requirements.filter(value => mongoName.includes(value)).length > 0) {
    filteredNames.push("mongodb");
  }

  if (requirements.filter(value => postgreName.includes(value)).length > 0) {
    filteredNames.push("postgresql");
  }

  if (
    requirements.filter(value => windowsServerName.includes(value)).length > 0
  ) {
    filteredNames.push("sql server");
  }

  if (requirements.filter(value => oracleName.includes(value)).length > 0) {
    filteredNames.push("oracle db");
  }

  return filteredNames;
};

const updateMobile = requirements => {
  const names = ["ios", "android"];

  return requirements.filter(value => names.includes(value));
};

const updateWebFrameworks = requirements => {
  const names = ["hibernate", "jquery", "django", "flask", "laravel", "drupal"];

  const reactNames = ["react", "react.js", "reactjs"];
  const netNames = [".net", "dotnet"];
  const aspnetNames = ["asp .net", "asp.net"];
  const netcoreNames = ["net core", ".net core"];
  const angularNames = ["angular", "angularjs", "angular.js"];
  const expressNames = ["express", "expressjs", "express.js"];
  const springNames = ["spring", "spring cloud"];
  const vueNames = ["vue", "vuejs", "vue.js"];
  const rubyNames = ["ruby on rails", "rubyonrails"];

  let filteredNames = requirements.filter(value => names.includes(value));
  if (requirements.filter(value => reactNames.includes(value)).length > 0) {
    filteredNames.push("react");
  }
  if (requirements.filter(value => netNames.includes(value)).length > 0) {
    filteredNames.push(".net");
  }
  if (requirements.filter(value => aspnetNames.includes(value)).length > 0) {
    filteredNames.push("asp .net");
  }
  if (requirements.filter(value => netcoreNames.includes(value)).length > 0) {
    filteredNames.push(".net core");
  }
  if (requirements.filter(value => angularNames.includes(value)).length > 0) {
    filteredNames.push("angular");
  }
  if (requirements.filter(value => expressNames.includes(value)).length > 0) {
    filteredNames.push("express");
  }
  if (requirements.filter(value => springNames.includes(value)).length > 0) {
    filteredNames.push("spring");
  }
  if (requirements.filter(value => vueNames.includes(value)).length > 0) {
    filteredNames.push("vue");
  }
  if (requirements.filter(value => rubyNames.includes(value)).length > 0) {
    filteredNames.push("ruby on rails");
  }

  return filteredNames;
};

const updateOtherFrameworks = requirements => {
  const names = [
    "pandas",
    "ansible",
    "cordova",
    "xamarin",
    "hadoop",
    "stl",
    "boost",
    "docker",
    "kubernetes",
    "heroku",
    "flutter",
    "magento",
    "numpy",
    "scikit-learn",
    "wordpress"
  ];

  const nodeNames = ["node", "nodejs", "node.js"];
  const javaeeNames = ["javaee", "java ee"];
  const unity3dNamed = ["unity", "unity 3d", "unity3d"];
  const reactNativeNames = ["react native", "reactnative"];
  const tensorflowNames = ["tensorflow", "tensor flow"];
  const torchNames = ["torch", "pytorch", "py torch"];
  const unrealEngineNames = ["unreal engine", "unrealengine"];
  const linuxNames = [
    "linux",
    "kernel",
    "device drivers",
    "devicedrivers",
    "unix"
  ];
  const awsNames = ["aws", "amazon", "amazon aws", "amazonaws"];
  const googleCloudNames = ["google cloud platform", "google cloud"];
  const azureNames = ["azure", "microsoft azure"];
  const ibmCloudNames = ["ibm cloud", "watson"];
  const sparkNames = ["apache spark", "spark"];

  let filteredNames = requirements.filter(value => names.includes(value));
  if (requirements.filter(value => nodeNames.includes(value)).length > 0) {
    filteredNames.push("node");
  }
  if (requirements.filter(value => javaeeNames.includes(value)).length > 0) {
    filteredNames.push("java ee");
  }
  if (requirements.filter(value => unity3dNamed.includes(value)).length > 0) {
    filteredNames.push("unity");
  }
  if (
    requirements.filter(value => reactNativeNames.includes(value)).length > 0
  ) {
    filteredNames.push("react native");
  }
  if (
    requirements.filter(value => tensorflowNames.includes(value)).length > 0
  ) {
    filteredNames.push("tensorflow");
  }
  if (requirements.filter(value => torchNames.includes(value)).length > 0) {
    filteredNames.push("pytorch");
  }
  if (
    requirements.filter(value => unrealEngineNames.includes(value)).length > 0
  ) {
    filteredNames.push("unreal engine");
  }
  if (requirements.filter(value => linuxNames.includes(value)).length > 0) {
    filteredNames.push("linux");
  }
  if (requirements.filter(value => awsNames.includes(value)).length > 0) {
    filteredNames.push("aws");
  }
  if (
    requirements.filter(value => googleCloudNames.includes(value)).length > 0
  ) {
    filteredNames.push("google cloud");
  }
  if (requirements.filter(value => azureNames.includes(value)).length > 0) {
    filteredNames.push("azure");
  }
  if (requirements.filter(value => ibmCloudNames.includes(value)).length > 0) {
    filteredNames.push("ibm cloud");
  }
  if (requirements.filter(value => sparkNames.includes(value)).length > 0) {
    filteredNames.push("apache spark");
  }

  return filteredNames;
};

const updateCity = city => {
  const names = [
    "remote",
    "szczecin",
    "gdynia",
    "katowice",
    "bydgoszcz",
    "gliwice",
    "sopot",
    "lublin"
  ];
  const warszawaNames = ["warsaw", "warszawa"];
  const krakowNames = ["kraków", "krakow", "cracow"];
  const wroclawNames = ["wrocław", "wroclaw", "wroclove"];
  const poznanNames = ["poznan", "poznań"];
  const gdanskNames = ["gdańsk", "gdansk"];
  const trojmiastoNames = ["trójmiasto", "trojmiasto"];
  const lodzNames = ["łódź", "lodz"];
  const slaskNames = ["śląsk", "slask"];
  const bialystokNames = ["białystok", "bialystok"];

  let filteredNames = city.filter(value => names.includes(value));
  if (city.filter(value => warszawaNames.includes(value)).length > 0) {
    filteredNames.push("warszawa");
  }
  if (city.filter(value => krakowNames.includes(value)).length > 0) {
    filteredNames.push("kraków");
  }
  if (city.filter(value => wroclawNames.includes(value)).length > 0) {
    filteredNames.push("wrocław");
  }
  if (city.filter(value => poznanNames.includes(value)).length > 0) {
    filteredNames.push("poznań");
  }
  if (city.filter(value => gdanskNames.includes(value)).length > 0) {
    filteredNames.push("gdańsk");
  }
  if (city.filter(value => trojmiastoNames.includes(value)).length > 0) {
    filteredNames.push("trójmiasto");
  }
  if (city.filter(value => lodzNames.includes(value)).length > 0) {
    filteredNames.push("łódź");
  }
  if (city.filter(value => slaskNames.includes(value)).length > 0) {
    filteredNames.push("śląsk");
  }
  if (city.filter(value => bialystokNames.includes(value)).length > 0) {
    filteredNames.push("białystok");
  }

  return filteredNames;
};

module.exports = {
  updateLanguages,
  updateDb,
  updateMobile,
  updateWebFrameworks,
  updateOtherFrameworks,
  updateCity
};
