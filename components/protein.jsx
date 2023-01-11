import React from "react";
import { View } from "react-native";
import Expo from "expo";
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Dimensions,
  BoxBufferGeometry,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";

const Protein = (props) => {
    const { atoms, connects } = props
    const onContextCreate = async (gl) => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          75,
          gl.drawingBufferWidth / gl.drawingBufferHeight
        )

        gl.canvas = {
          width: gl.drawingBufferWidth,
          height: gl.drawingBufferHeight,
        }
    
        // set camera position away from cube
        camera.position.z = 3
        scene.add(camera)
    
        const renderer = new Renderer({ gl });
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        // renderer.setClearColor(0x000000, 1.0)
    
        // create cube
        // define geometry
        const geometry1 = new THREE.SphereGeometry(0.2, 64, 64);
        const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 32);
        const material = new THREE.MeshStandardMaterial({
          color: "red",
        });
        const material1 = new THREE.MeshStandardMaterial({
          color: "blue",
        });
        
    
        const cylinder = new Mesh(geometry, material)
        const sphere = new Mesh(geometry1, material1)
        sphere.position.x = 0.4
    
        // add cylinder to scene
        scene.add(cylinder)

        scene.add(sphere)

        //rotate cylinder with 90 degrees around x axis
        cylinder.rotation.z = Math.PI / 2
      

        const light = new THREE.DirectionalLight(0xffffff, 1.0);
        light.position.y = 50
        light.position.z= 50
        scene.add(light);

        renderer.render(scene, camera);
        gl.endFrameEXP();
      }

  return (
    <View>
      <GLView
        onContextCreate={onContextCreate}
        
        style={{ width: 400, height: 900 }}
      />
    </View>
  );
};

export default Protein