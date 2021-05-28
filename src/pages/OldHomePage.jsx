import { useEffect, useRef, useState } from "react";
import Chat from "../components/chat/Chat";
import Settings from "../pages/Settings";
import UserList from "../components/user/UserList";
import styles from './index.module.scss';

const stun = [
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  'stun:stun.freeswitch.org:3478'
]

const connection = new RTCPeerConnection({
  iceServers: [ {urls: stun } ]
});

const Home = ({ nickname, socket }) => {

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [offer, setOffer] = useState();
  const [callerId, setCallerId] = useState();
  const [users, setUsers] = useState([]);

  const [stream, setStream] = useState();

  useEffect(() => {

    const queue = [];

    socket?.on('user-enter', (user) => setUsers((prev) => [...prev, user]));
    socket?.on('user-left', (user) => setUsers((prev) => prev.splice(prev.findIndex(s => s.id === user.id), 1)));


    socket?.on('welcome', (users) => setUsers(users));
    socket?.on('offer', ({ offer, callerId }) => {
      console.log('Recieve offer', offer, callerId); 
      setOffer(offer); 
      setCallerId(callerId); 
      connection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          console.log('Remote description is set');
          queue.forEach(candidate => {

          });
        });
    });
    socket?.on('answer', (answer) => {
      console.log('Recieve answer', new RTCSessionDescription(answer)); 
      connection.setRemoteDescription(new RTCSessionDescription(answer));
    });
    socket?.on('icecandidate', async (candidate) => {
      console.log('Adding ICE candidate...', new RTCIceCandidate(candidate));
      connection.addIceCandidate(new RTCIceCandidate(candidate));
    });




    connection.ontrack = (e) => {
      console.log("Answer got some connection ");
       if (remoteVideoRef.current.srcObject !== e.streams[0]) {
        remoteVideoRef.current.srcObject = e.streams[0];
       }
    }




  }, [socket]);

  const handleOnCall = (async (id) => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    setStream(stream);
    localVideoRef.current.srcObject = stream;

    connection.onicecandidate = (e) => {
      if (e.candidate) { socket?.emit('icecandidate', { id, candidate: new RTCIceCandidate(e.candidate) }); }
    }

    stream.getTracks().forEach(track => connection.addTrack(track, stream));

    const offer = await connection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });



    socket?.emit('offer', { id, offer}, () => {
      console.log('Offer callback');
    });
    

    connection.setLocalDescription(offer);


      
  });

  const handleAnswer = (async() => {


    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach(track => connection.addTrack(track, stream));


    connection.onicecandidate = (e) => {
      if (e.candidate) { socket?.emit('icecandidate', { id: callerId, candidate: new RTCIceCandidate(e.candidate) }); }
    }

    const answer = await connection.createAnswer();

    socket?.emit('answer', { id: callerId, answer });

    await connection.setLocalDescription(answer);

    
  });

  return (
    <div className={styles.home}>
      <div>
        <UserList users={users} onCall={handleOnCall} />
        { offer && <button onClick={handleAnswer}>Answer</button> }
        { callerId && `Caller: ${callerId}` }
        <video ref={localVideoRef} autoPlay playsInline />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <Chat socket={socket} />
      <Settings />
    </div>
  );
}

export default Home;
