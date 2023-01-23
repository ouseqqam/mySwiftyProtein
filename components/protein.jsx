import { TouchableOpacity, View, Text, StyleSheet, Alert, Modal } from "react-native"
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

const raycaster = new THREE.Raycaster()

const Protein = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
    const { atoms, connects } = props
    const [dimention, setDimention] = useState({})
    const [touch, setTouch] = useState({})
    const [camera, setCamera] = useState()
    const viewShot = useRef();
    const [spheres, setSpheres] = useState([])
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
        camera.position.z = 10
        camera.lookAt(0,0,0)
        setCamera(camera)
        // scene.add(camera)
    
        const renderer = new Renderer({ gl })
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        renderer.setClearColor(0x000000, 1.0)

        
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
        setSpheres(prev => [...prev, sphere])
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
        renderer.render(scene, camera)
        gl.endFrameEXP();
      };
      render();
    }
    // const captureAndShareScreenshot = () => {
    //     viewShot.current.capture().then((uri) => {
    //     Sharing.shareAsync(uri)
    //   }),
    //   (error) => console.error("Oops, snapshot failed", error)
    // };

    // const pointer = new THREE.Vector2()
    const getTouchPosition =  (e) => {
      const {locationX, locationY} = e.nativeEvent
      const x = (locationX / dimention.width) * 2 - 1
      const y = - (locationY / dimention.height) * 2 + 1
      const point = {x, y}
      if (point && spheres) {
        raycaster.setFromCamera( point, camera )
        const intersects = raycaster.intersectObjects(spheres)
        if (intersects.length > 0) {
          for(let i = 0; i < atoms.length; i++) {
            let {x, y, z} = atoms[i]
            let a1 = new THREE.Vector3(x, y, z)
            let distance = a1.distanceTo(camera.position)
            if (parseInt(distance) == parseInt(intersects[0].distance)) {
              Alert.alert("Information", "test")
              break
            }
          }
        }
      }
      setTouch({x, y})
    }

    const getOrbitDmention = (e) => {
      const {height, width} = e.nativeEvent.layout
      setDimention({height, width})
    }

  return (
    <View style= {styles.container}>
      {/* <TouchableOpacity onPress={captureAndShareScreenshot}>
        <Text>Share</Text>
      </TouchableOpacity> */}
      {/* <ViewShot
      ref = {viewShot}
      options={{ quality: 0.9, result:"base64" }}
      > */}
        <View style= {styles.container} >
          {
            atoms && connects &&
            <OrbitControlsView
              camera= {camera}
              style= {styles.container}
              onLayout = {getOrbitDmention}
            >
              <GLView
                onContextCreate={onContextCreate}
                style= {styles.container}
                onTouchEndCapture={getTouchPosition}
              />
            </OrbitControlsView>
          }
        </View>
      {/* </ViewShot> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center'
  }
})

export default Protein