const userName = encodeURIComponent("vagner");
const password = encodeURIComponent("knedlik110507");
const clusterUrl =
  "server-super-admin.wmlhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const authMechanism = "DEFAULT";

export const url = `mongodb+srv://${userName}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
