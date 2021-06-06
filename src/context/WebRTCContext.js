import React from "react";

const stunServers = [
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  'stun:stun.freeswitch.org:3478'
];

const connection = new RTCPeerConnection({
  iceServers: [ { urls: stunServers } ]
});

const WebRTCContext = React.createContext(connection);

export default WebRTCContext;