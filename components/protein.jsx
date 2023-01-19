import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Dimensions,
  BoxBufferGeometry,
  Vector3,
} from "three"

import { useState, useEffect, useRef } from 'react'

import OrbitControlsView from '../orbitControls/OrbitControlsView'
import { Renderer } from "expo-three"
import { GLView } from "expo-gl"
import colors from '../data/cpkColors.json'
// import * as Sharing from 'expo-sharing'
import ViewShot from "react-native-view-shot"


const Protein = (props) => {
    const { atoms, connects } = props
    const [camera, setCamera] = useState()
    const viewShot = useRef();
    let timeout

    useEffect(() => {
      // Clear the animation loop when the component unmountsr
      return () => clearTimeout(timeout);
    }, []);

    const onContextCreate = async (gl) => {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
          75,
          gl.drawingBufferWidth / gl.drawingBufferHeight
        )

        gl.canvas = {
          width: gl.drawingBufferWidth,
          height: gl.drawingBufferHeight,
        }
    
        // set camera position away from cube
        camera.position.z = 60
        camera.lookAt(0,0,0)
        setCamera(camera)
        scene.add(camera)
    
        const renderer = new Renderer({ gl })
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        // renderer.setClearColor(0x000000, 1.0)

        // const light = new THREE.DirectionalLight(0xffffff, 1.0)
        // light.position.y = 0
        // light.position.z= 50
        
        // scene.add(light)

        
        let material = ''

      atoms.forEach(atom => {
        let {x, y, z} = atom
        
        let geometry = new THREE.SphereGeometry(0.3)
        let element = atom.element
        if (element.length == 2)
          element = element[0] + element[1].toLowerCase()
        let color  = colors[element].jmol
        material = new THREE.MeshMatcapMaterial({
          color: `#${color}`,
        })
        let sphere = new Mesh(geometry, material)
        sphere.position.set(x, y, z)
        scene.add(sphere)

      })

      connects.forEach(connect => {
        let {x, y, z} = atoms[connect[0] - 1]
        let a1 = new THREE.Vector3(x, y, z)

        for (let i = 1; i < connect.length; i++) {
          let {x, y, z} = atoms[connect[i] - 1]
          let a2 = new THREE.Vector3(x, y, z)
          let distance = a1.distanceTo(a2)
          let geometry = new THREE.CylinderGeometry( 0.1, 0.1, distance, 32, 32)
          let cylinder = new Mesh(geometry, material)
          cylinder.position.set(x, y, z)
          geometry.translate( 0, distance / 2, 0)
          geometry.rotateX( Math.PI / 2 )
          cylinder.lookAt(a1) 
          scene.add(cylinder)  
        }
      })


        
      const render = () => {
        timeout = requestAnimationFrame(render)
        renderer.render(scene, camera);

        gl.endFrameEXP();
      };
      render();
    }
    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
        Sharing.shareAsync(uri)
      }),
      (error) => console.error("Oops, snapshot failed", error);
      };


  return (
    <View style= {styles.container}>
      <TouchableOpacity onPress={captureAndShareScreenshot}>
        <Text>Share</Text>
      </TouchableOpacity>
      <ViewShot
      ref = {viewShot}
      options={{ quality: 0.9, result:"base64" }}
      >
        <View>
          {/* {
            atoms && connects &&
            <OrbitControlsView camera= {camera}  >
              <GLView
                onContextCreate={onContextCreate}
                style = {styles.tst}
              />
            </OrbitControlsView>
          } */}
          <Text style= {styles.tst}>Hello</Text>
        </View>
      </ViewShot>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
  },
  tst: {

  }
})

export default Protein