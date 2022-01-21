import React, { RefObject, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { softShadows, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Material, Object3D } from 'three';
import { gsap, Linear, Sine } from 'gsap';

function Loading() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
type ModelProps = {
  url: string;
  rotation: number;
};
type ThreeDObj = GLTF & {
  nodes: Object3D[];
  material: Material[];
};

const Model = ({ url,  rotation }: ModelProps) => {
  const fullObj = useGLTF(url) as ThreeDObj;
  const obj = fullObj.scene;
  console.log(fullObj);
  // fullObj.nodes.keys().forEach(node => {});
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // camera.rotation.y = rotation;
  // obj.scene.scale.y = 1;
  console.log('>>>>>>>>');
  console.log(camera);
  console.log('>>>>>>>>');
  camera.position.x=2;
  // camera.
  // camera.position.y=5;
  obj.position.y=-3;
  obj.position.x=4;
  // obj.position.x = obj.wi
  // obj.scale.y = 1+rotation;
  // obj.rotation.y=rotation === 0 ? 0 : Math.PI/rotation;
  obj.scale.y = 1 + (rotation/5);
  obj.scale.x=1 + (rotation/5);
  obj.scale.z=1 + (rotation/5);
  obj.rotation.y=rotation;
  // obj.scene.rotateOnAxis(obj.scene.position, rotation);;
  console.log(obj);

  // return <primitive object={obj} onClick={onclick} scale={{...obj.scale, y: rotation+0.1}} rotation={{y: Math.PI / (rotation + 0.1)}}/>;
  return <primitive object={obj}  castShadow/>;
};

type leafProps = {
  w: number;
  h: number;
};

const Leaf = ({w, h}: leafProps) => {
  const random = (min: number, max: number) => {
    return min+Math.random()*(max-min);
  };
  const boxRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  
  useEffect(() => {
    console.log(w, h);
    gsap.set(boxRef.current, { x: random(0, w), y: random(-100,-450),z: random(-200,200)});
    gsap.to(boxRef.current,random(6,15),{y: h-10,ease: Linear.easeNone,repeat:-1,delay:-15});
    gsap.to(boxRef.current,random(4,8),{x: w+100,rotationZ:random(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
    gsap.to(boxRef.current,random(2,8),{rotationX:random(0,360),rotationY:random(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
  }, [w, h]);
  return <div className='dot' ref={boxRef} ></div>;
};

softShadows();
const Component = () => {
  
  const boxRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [rotation, setRotation] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  useEffect(() => {
    setW(boxRef.current?.offsetWidth || 0);
    setH(boxRef.current?.offsetHeight || 0);
  }, []);
  
  return (
    <div className='flex flex-col justify-center'>
    <div className='p-10 font-bold'>
      Menu
    </div>
      <div className='flex w-full p-4 wallpaper' onClick={() => { setRotation(rotation + 0.1);}} ref={boxRef}>
      {
        Array(30).fill(0).map((_, index) => {
          return <Leaf key={index} w={w} h={h} />;
        })
      }
      <div className='flex w-3/5'>
        <div>Archana</div>
      </div>
      <div className='w-2/5 h-full'>
        <Canvas >
          
          <spotLight position={[15, 15, 15]} angle={0.9} />
          <Suspense fallback={<Loading />}>
            {/* <pointLight position={[5, 5, 5]} /> */}
            <ambientLight intensity={0.9} />
            <directionalLight intensity={0.2} receiveShadow/>
            <Model url='tree-test.glb' rotation={rotation}/>
            {/* <Model url='scene.gltf' rotation={rotation*4} /> */}
            {/* <CameraControls /> */}
            {/* <Loading /> */}
        </Suspense>
        </Canvas>
      </div>
      </div>
    </div>
  );
};

export default Component;