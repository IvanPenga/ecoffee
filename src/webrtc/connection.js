import stunServers from "./stun";

const connection = new RTCPeerConnection({
  iceServers: [ {urls: stunServers } ]
});



export default connection;