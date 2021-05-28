const url = 'https://robohash.org/';
const ext = '.png';
const query = '?size=100x100';
const hashes = [
  'b9cc3872853c8c3ed85db39771a27fe3',
  'f1e68df62e876e7fd0e51c20b0f4a7f4',
  'ef67ea27213a5744db57dc0fd3a3ba22',
  '07b4fe6d6119fb4501a489466eeee235',
  'ec2acfd745b1efbe615f0a89ae2956ce',
  'd2b82830880fd50a4d1e9d20fc3ecb74',
  'f4df169dcfa242fcab91495eeff9dadb',
  '802ddba716bb44302943f322c419ae58',
  'b91774ec221c52d0bfb718a1ae3ab8c6',
  'ac01b565737abe314877dcc981aa37f3',
  '65528ccdb996fcb57c85cd584772310c',
  '568f03fb703e6f4137ccb2fc7e5cbdd8',
  '9c3f3ffb2939a30d7aa42105b0668820',
  '5ac483a422267f2882fe8fe8b2173fbe',
  '42df9bb3cfd73ef98f3302e594d26b39',
  '849b922ba34228e8cb882866bc283b17',
  '4a3ca6cb07b66e4bde0806c703e442ed',
  'f591ddaef9ed87f9e7b3d113a40c4b46',
  '10c1f317b31ca5a76e9c34af34dc7827',
  'b01ed1e0657688cad8aeb3d2d1b3d94b',
  'eba297a6d31d8650bd626a423ff274ad',
  '6ebd5f6d4c9d43c1dc5083a5f2082167',
  'c2d9f90a61e4d28f7734dafb65457017',
  '64211c6c85f66d89c1e2177d578719de',
  '73cbc5714ec21972aeadcbee69dfe956',
  '8df99977ee64dfa6a9c581ce7a7e277a',
  'd723e9b27ce8864111a5cbb59cc9c720',
  '8e428180bfc90f6364e72a3769902455',
  '4dc9c222c5e2599d2b72e8eddc150b94',
  '3d586a434b17e3d1ed7d6eb050a97fb0',
];

const getAvatar = (hash) => {
  return `${url}${hash}${ext}${query}`;
}

export default getAvatar;
export { getAvatar, hashes }