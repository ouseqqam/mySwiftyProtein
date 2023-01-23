import colors from '../data/cpkColors.json'

const onContextCreate = async (gl, atoms, connects, camera) => {
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

export default onContextCreate