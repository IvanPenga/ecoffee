import styles from './index.module.scss';

const IceCandidates = ({ icecandidates = [] }) => {
  return (
    <table>
      <tr>
        <th>Address</th>
        <th>Port</th>
        <th>Protocol</th>
      </tr>
      {icecandidates.map((candidate) => candidate && (
        <tr key={`${candidate?.address}:${candidate?.port}`}>
          <td>{candidate?.address}</td>
          <td>{candidate?.port}</td>
          <td>{candidate?.protocol}</td>
        </tr>
      ))}
    </table>
  );
}

export default IceCandidates;

/*
address: "192.168.0.126"
candidate: "candidate:547636346 1 udp 2122260223 192.168.0.126 51427 typ host generation 0 ufrag 7vas network-id 1 network-cost 10"
component: "rtp"
foundation: "547636346"
port: 51427
priority: 2122260223
protocol: "udp"
relatedAddress: null
relatedPort: null
sdpMLineIndex: 0
sdpMid: "0"
tcpType: null
type: "host"
usernameFragment: "7vas"
*/