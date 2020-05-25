/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
		this.initMaterials();
		this.display();
	}
	init() {
		
		this.plane= new MyPlaneAUX(this.scene, 20, 0, 1, 0, 1);


	}

	

	initMaterials(){

		//------ test
		this.test = new CGFappearance(this.scene);
		this.test.setAmbient(1, 1, 1, 1);
		this.test.setDiffuse(0, 0, 0, 1);
		this.test.setSpecular(0, 0, 0, 1);
		this.test.setEmission(1, 1, 1, 1);
		this.test.setShininess(10.0);
		this.test.loadTexture('images/texture.jpg');
		this.test.setTextureWrap('REPEAT', 'REPEAT');
		//------

		// Materials and textures initialization

		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		this.texture = new CGFtexture(this.scene, "images/terrain/terrain.jpg");
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.texture2 = new CGFtexture(this.scene, "images/terrain/heightmap_edit.jpg");
		
		this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

		this.shader.setUniformsValues({ uSampler2: 1 });	
	}


	display(){

		// activate selected shader
		this.scene.setActiveShader(this.shader);
		this.scene.pushMatrix();
		
		// bind additional texture to texture unit 1
		this.texture2.bind(1);

		this.appearance.apply();
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(0 , 0 , 0);
			this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);

		
	}
}

