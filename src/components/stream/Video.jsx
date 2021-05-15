import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';

const Stream = ({ }) => {

  const connection = useMemo(() => new RTCPeerConnection({}));
  
  const [ stream, setStream ] = useState();
  
  const videoRef = useRef();
  const textareaRef = useRef();

  const handlePlayStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    setStream(stream);
  }, []);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      // console.log(devices);
    }).catch();
  }, []);

  const handleOffer = useCallback(async () => {
    connection.onicecandidate = (e) => {
      if (e.candidate) {
        const value = textareaRef.current.value;
        const obj = JSON.parse(value);
        obj.candidates.push({ 
          address: e.candidate.address,
          candidate: e.candidate.candidate,
          component: e.candidate.component,
          foundation: e.candidate.foundation,
          port: e.candidate.port,
          priority: e.candidate.priority,
          protocol: e.candidate.protocol,
          relatedAddress: e.candidate.relatedAddress,
          relatedPort: e.candidate.relatedPort,
          sdpMLineIndex: e.candidate.sdpMLineIndex,
          sdpMid: e.candidate.sdpMid,
          tcpType: e.candidate.tcpType,
          type: e.candidate.type,
          usernameFragment: e.candidate.usernameFragment,
        });
        textareaRef.current.value = JSON.stringify(obj); 
      }
    }

    connection.ontrack = () => {
      console.log("Offer got some connection")
    }

    stream.getTracks().forEach(track => connection.addTrack(track, stream));
    
    const offer = await connection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    const value = { offer: offer, candidates: [] };

    textareaRef.current.value = JSON.stringify(value);    
    connection.setLocalDescription(offer);

  }, [stream, connection]);

  const handleAnswer = useCallback(async() => {
    const { offer, candidates } = JSON.parse(textareaRef.current.value);



    connection.onicecandidate = (e) => {
      if (e.candidate) {
        const value = textareaRef.current.value;
        const obj = JSON.parse(value);
        obj.candidates.push({ 
          address: e.candidate.address,
          candidate: e.candidate.candidate,
          component: e.candidate.component,
          foundation: e.candidate.foundation,
          port: e.candidate.port,
          priority: e.candidate.priority,
          protocol: e.candidate.protocol,
          relatedAddress: e.candidate.relatedAddress,
          relatedPort: e.candidate.relatedPort,
          sdpMLineIndex: e.candidate.sdpMLineIndex,
          sdpMid: e.candidate.sdpMid,
          tcpType: e.candidate.tcpType,
          type: e.candidate.type,
          usernameFragment: e.candidate.usernameFragment,
        });
        textareaRef.current.value = JSON.stringify(obj); 
      }
    }

    connection.setRemoteDescription(offer);

    connection.ontrack = (e) => {
      console.log("Answer got some connection");
      if (videoRef.current.srcObject !== e.streams[0]) {
        videoRef.current.srcObject = e.streams[0];
        console.log('pc2 received remote stream');
      }
    }

    const answer = await connection.createAnswer();
    connection.setLocalDescription(answer);

    
    candidates.map(c => {
      connection.addIceCandidate(c).then().catch(e => console.log(e))
    });


    const value = { answer: answer, candidates: [] };
    textareaRef.current.value = JSON.stringify(value);


  }, [stream, connection]);

  const handleLoad = useCallback(() => {

    // navigator.clipboard.writeText("hello world")


    const { answer, candidates } = JSON.parse(textareaRef.current.value);
    connection.setRemoteDescription(answer);

    candidates.map(c => {
      connection.addIceCandidate(c).then().catch(e => console.log(e))
    });

    textareaRef.current.value = "done";

  }, [stream, connection]);

  return (
    <div className={styles.video}>
      <video ref={videoRef} autoPlay playsInline />
      <button>Start</button>
    </div>
  );
}

export default Stream;
