import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native"
import { Scene, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from "three"
import { useState, useEffect, useRef } from 'react'
import OrbitControlsView from '../orbitControls/OrbitControlsView'
import { Renderer } from "expo-three"
import { GLView } from "expo-gl"
import colors from '../data/cpkColors.json'
import * as Sharing from 'expo-sharing'
import ViewShot from "react-native-view-shot"
import Settings from "./settings"
import Share from 'react-native-share';
import RNFS from 'react-native-fs'

const raycaster = new THREE.Raycaster()

const Protein = (props) => {
    const [dim, setDim] = useState(true)
    const { atoms, connects } = props
    const [cube, setCube] = useState(false)
    const [jmol, setJmol] = useState(true)
    const [dimention, setDimention] = useState({})
    const [camera, setCamera] = useState()
    const [spheres, setSpheres] = useState([])
    const [render, setRender] = useState(true)
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
        camera.position.z = 20
        camera.lookAt(0,0,0)
        setCamera(camera)
    
        const renderer = new Renderer({ gl })
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        renderer.setClearColor(0x000000, 1.0)

        
        let material = ''

      atoms.forEach(atom => {
        let {x, y, z} = atom
        let geometry = ''
        if (!cube)
          geometry = new THREE.SphereGeometry(0.3)
        else
          geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        let element = atom.element
        if (element.length == 2)
          element = element[0] + element[1].toLowerCase()
        let color = ''
        if (jmol)  
          color  = colors[element].jmol
        else
          color = colors[element].rasmol
        material = new THREE.MeshMatcapMaterial({
          color: `#${color}`,
        })
        let sphere = new Mesh(geometry, material)
        sphere.position.set(x, y, z)
        sphere.name = atom.element
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
      }
      render();
    }
    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
          RNFS.readFile(uri, 'base64').then((res) => {
            let urlString = 'data:image/jpeg;base64,' + res;
            let options = {
              title: 'Swifty Protein',
              message: '3d modelisation',
              url: urlString,
              type: 'image/jpeg',
            };
            Share.open(options)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log(err);
              });
          });
      }),
      (error) => console.error("Oops, snapshot failed", error)
    };

    const getTouchPosition =  (e) => {
      const {locationX, locationY} = e.nativeEvent
      const x = (locationX / dimention.width) * 2 - 1
      const y = - (locationY / dimention.height) * 2 + 1
      const point = {x, y}
      if (point && spheres) {
        raycaster.setFromCamera( point, camera )
        const intersects = raycaster.intersectObjects(spheres)
        if (intersects.length > 0) {
          Alert.alert("Atom type", `${intersects[0].object.name}`)
        }
      }
    }

    const getOrbitDmention = (e) => {
      const {height, width} = e.nativeEvent.layout
      if (height < width && dim) {
        setDim(false)
        setRender(!render)
      }
      else if (height > width && !dim) {
        setDim(true)
        setRender(!render)
      }
      setDimention({height, width})
    }

    const changeForm = () => {
      setCube(!cube)
      setRender(!render)
    }

    const changeColor = () => {
      setJmol(!jmol)
      setRender(!render)
    }


  return (
    <View style= {styles.container} >
      <Settings
        cube = {cube}
        jmol = {jmol}
        changeForm = {changeForm}
        changeColor = {changeColor}
        captureAndShareScreenshot = {captureAndShareScreenshot}
      />
      <ViewShot
      ref = {viewShot}
      options={{ format: 'jpg', quality: 0.9 }}
      style= {styles.container}
      >
      <View style= {styles.container} key = {render} >

          {
            atoms && connects ? 
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
            : 
              <ActivityIndicator size = "large" /> 
          }
      </View>
      </ViewShot>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor: 'black'
  }
})

export default Protein