/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
		this.initMaterials();
		this.display();
	}
	init() {

		// definir coordenadas da textura
		// neste caso, 6 imagens diferentes para as faces
		// Logo coordenadas (s,t) são todas iguais 
		this.coords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		
		// 6 faces do cubo
		this.plane1 = new MyPlane(this.scene, undefined, this.coords);
		this.plane2 = new MyPlane(this.scene, undefined, this.coords);
		this.plane3 = new MyPlane(this.scene, undefined, this.coords);
		this.plane4 = new MyPlane(this.scene, undefined, this.coords);
		this.plane5 = new MyPlane(this.scene, undefined, this.coords);
		this.plane6 = new MyPlane(this.scene, undefined, this.coords);

	}

	updateCoords(){

		// pontos textura para a imagem com todas as faces do cubo
		if(this.scene.selectedTextureCube!=7){

			//back
			this.coords = [
				3/4, 2/3,
				1, 2/3,
				3/4, 1/3,
				1, 1/3
			]
			this.plane1 = new MyPlane(this.scene, undefined, this.coords);

			//front
			this.coords = [
				1/4, 2/3,
				2/4, 2/3,
				1/4, 1/3,
				2/4, 1/3
			]
			this.plane2 = new MyPlane(this.scene, undefined, this.coords);

			//top
			this.coords = [
				1/4, 1/3,
				2/4, 1/3,
				1/4, 0/3,
				2/4, 0/3
			]
			this.plane3 = new MyPlane(this.scene, undefined, this.coords);

			//bottom
			this.coords = [
				1/4, 3/3,
				2/4, 3/3,
				1/4, 2/3,
				2/4, 2/3
			]
			this.plane4 = new MyPlane(this.scene, undefined, this.coords);

			//right
			this.coords = [
				2/4, 2/3,
				3/4, 2/3,
				2/4, 1/3,
				3/4, 1/3
			]
			this.plane5 = new MyPlane(this.scene, undefined, this.coords);

			//left
			this.coords = [
				0/4, 2/3,
				1/4, 2/3,
				0/4, 1/3,
				1/4, 1/3
			]
			this.plane6 = new MyPlane(this.scene, undefined, this.coords);
		}
		else{
			this.init();
		}
	}

	initMaterials(){

		//------ Front
		this.front = new CGFappearance(this.scene);
		this.front.setAmbient(1, 1, 1, 1);
		this.front.setDiffuse(0, 0, 0, 1);
		this.front.setSpecular(0, 0, 0, 1);
		this.front.setEmission(1, 1, 1, 1);
		this.front.setShininess(10.0);
		this.front.loadTexture('images/cubemap/split_cubemap/front.png');
		this.front.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ Back
		this.back = new CGFappearance(this.scene);
		this.back.setAmbient(1, 1, 1, 1);
		this.back.setDiffuse(0.0, 0.0, 0.0, 1);
		this.back.setSpecular(0.0, 0.0, 0.0, 1);
		this.back.setEmission(1, 1, 1, 1);
		this.back.setShininess(10.0);
		this.back.loadTexture('images/cubemap/split_cubemap/back.png');
		this.back.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ right
		this.right = new CGFappearance(this.scene);
		this.right.setAmbient(1, 1, 1, 1);
		this.right.setDiffuse(0.0, 0.0, 0.0, 1);
		this.right.setSpecular(0.0, 0.0, 0.0, 1);
		this.right.setEmission(1, 1, 1, 1);
		this.right.setShininess(10.0);
		this.right.loadTexture('images/cubemap/split_cubemap/right.png');
		this.right.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ left
		this.left = new CGFappearance(this.scene);
		this.left.setAmbient(1, 1, 1, 1);
		this.left.setDiffuse(0.0, 0.0, 0.0, 1);
		this.left.setSpecular(0.0, 0.0, 0.0, 1);
		this.left.setEmission(1, 1, 1, 1);
		this.left.setShininess(10.0);
		this.left.loadTexture('images/cubemap/split_cubemap/left.png');
		this.left.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ Top
		this.top = new CGFappearance(this.scene);
		this.top.setAmbient(1, 1, 1, 1);
		this.top.setDiffuse(0.0, 0.0, 0.0, 1);
		this.top.setSpecular(0.0, 0.0, 0.0, 1);
		this.top.setEmission(1, 1, 1, 1);
		this.top.setShininess(10.0);
		this.top.loadTexture('images/cubemap/split_cubemap/top.png');
		this.top.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ Bottom
		this.bottom = new CGFappearance(this.scene);
		this.bottom.setAmbient(1, 1, 1, 1);
		this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
		this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
		this.bottom.setEmission(1, 1, 1, 1);
		this.bottom.setShininess(10.0);
		this.bottom.loadTexture('images/cubemap/split_cubemap/bottom.png');
		this.bottom.setTextureWrap('REPEAT', 'REPEAT');
		//------
		console.log('test');
	}


	display(){

		//------------------------
        //         TOP           |
        //------------------------
		this.top.apply();
		//plane3 Y+
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(0 , 0.5 , 0);
			this.scene.rotate(Math.PI/2 , 1 ,0, 0);
			this.scene.rotate(Math.PI/2 , 0 ,0, 1); //corrigir imagem
			this.plane3.display();
		this.scene.popMatrix();

		//------------------------
        //        BOTTOM         |
        //------------------------
		this.bottom.apply();
		//plane4 Y-
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(0 , -0.5 , 0);
			this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
			this.scene.rotate(Math.PI/2 , 0 ,0, 1); //corrigir imagem
			this.plane4.display();
		this.scene.popMatrix();

		//------------------------
        //         BACK         |
        //------------------------
		this.back.apply();
		//plane1 Z+
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(0, 0 , 0.5);
			this.scene.rotate(Math.PI, 1 ,0, 0);
			this.scene.rotate(-Math.PI/2 , 0 ,0, 1); //corrigir imagem
            this.plane1.display();
		this.scene.popMatrix();

		//------------------------
        //         FRONT         |
		//------------------------
		this.front.apply();
		//plane2 Z-
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(0 , 0 , -0.5);
			this.scene.rotate(0, 1 ,0, 0);
			this.scene.rotate(Math.PI/2 , 0 ,0, 1); //corrigir imagem
			this.plane2.display();
		this.scene.popMatrix();
		
		//------------------------
        //         RIGHT         |
		//------------------------
		this.right.apply();
		//plane5 X+
		this.scene.pushMatrix();
		    this.scene.scale(50, 50, 50);
			this.scene.translate(0.5 , 0 , 0);
			this.scene.rotate(-Math.PI/2 , 0 ,1, 0);
			this.scene.rotate(Math.PI/2 , 0 ,0, 1); //corrigir imagem
			this.plane5.display();
		this.scene.popMatrix();

		//------------------------
        //         LEFT          |
		//------------------------
		this.left.apply();
		//plane6 X-
		this.scene.pushMatrix();
			this.scene.scale(50, 50, 50);
			this.scene.translate(-0.5 , 0 , 0);
			this.scene.rotate(Math.PI/2 , 0 ,1, 0);
			this.scene.rotate(Math.PI/2 , 0 ,0, 1); //corrigir imagem
			this.plane6.display();
		this.scene.popMatrix();

	}
}

