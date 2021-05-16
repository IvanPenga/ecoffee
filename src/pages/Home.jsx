import { useEffect, useRef, useState } from "react";
import UserList from "../components/user/UserList";

const connection = new RTCPeerConnection({
  iceServers: [{urls: "stun:stun.1.google.com:19302"}]
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

  const open = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    setStream(stream);
    localVideoRef.current.srcObject = stream;
  }

  const handleOnCall = (async (id) => {


    connection.ontrack = () => {
      console.log('I got some tracks!');
    };

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

    connection.onicecandidate = (e) => {
      if (e.candidate) { socket?.emit('icecandidate', { id: callerId, candidate: new RTCIceCandidate(e.candidate) }); }
    }

    // connection.ontrack = (e) => {
    //   console.log("Answer got some connection ");
    //    if (remoteVideoRef.current.srcObject !== e.streams[0]) {
    //     remoteVideoRef.current.srcObject = e.streams[0];
    //    }
    // }

    const answer = await connection.createAnswer();

    socket?.emit('answer', { id: callerId, answer });

    await connection.setLocalDescription(answer);

    
  });

  return (
    <div className="home">
      <UserList users={users} onCall={handleOnCall} />
      { offer && <button onClick={handleAnswer}>Answer</button> }
      { callerId && `Caller: ${callerId}` }
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />

      <button onClick={open}>
        OPEN
      </button>
    </div>
  );
}

export default Home;
