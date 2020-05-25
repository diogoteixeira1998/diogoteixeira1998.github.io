/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);

		this.Nsupplies=0;

		this.init();
		this.initMaterials();
		this.display();
	}
	init() {	
		this.board= new MyPlaneAUX(this.scene, 10, 0, 1, 0, 1);
		this.leg1= new MyPlaneAUX(this.scene, 2, 0, 1, 0, 1);
		this.leg2= new MyPlaneAUX(this.scene, 2, 0, 1, 0, 1);
		this.screen= new MyPlaneAUX(this.scene, 2, 0, 1, 0, 1);
	}


	initMaterials(){

		//------ board
		this.testBoard = new CGFappearance(this.scene);
		this.testBoard.setAmbient(1, 1, 1, 1);
		this.testBoard.setDiffuse(0, 0, 0, 1);
		this.testBoard.setSpecular(0, 0, 0, 1);
		this.testBoard.setEmission(1, 1, 1, 1);
		this.testBoard.setShininess(10.0);
		this.testBoard.loadTexture('images/billboard/billboard.png');
		this.testBoard.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ legs
		this.testLeg = new CGFappearance(this.scene);
		this.testLeg.setAmbient(0.5,0.5,0.5, 1);
		this.testLeg.setDiffuse(0, 0, 0, 1);
		this.testLeg.setSpecular(0, 0, 0, 1);
		this.testLeg.setEmission(0.5,0.5,0.5, 1);
		this.testLeg.setShininess(10.0);
		//------


		// ---- barra de supplies (gradiente vermelho - verde)
		this.testScreen = new CGFappearance(this.scene);
		this.testScreen.setAmbient(0.3, 0.3, 0.3, 1);
		this.testScreen.setDiffuse(0.7, 0.7, 0.7, 1);
		this.testScreen.setSpecular(0.0, 0.0, 0.0, 1);
		this.testScreen.setShininess(10);
		this.screenShader = new CGFshader(this.scene.gl, "shaders/screen.vert", "shaders/screen.frag");
		this.screenShader.setUniformsValues({nSupllies: 0.0 });

		
	}

	getNsupplies(countSupplies){
		// update numero de supplies dropped para atualizar shader (barra que mostra a quantidade de supplies)
		this.screenShader.setUniformsValues({nSupllies: countSupplies });
		//console.log(countSupplies);
	}

	display(){

		this.scene.pushMatrix();
		this.scene.scale(this.scene.scaleFactorBillboard, this.scene.scaleFactorBillboard, this.scene.scaleFactorBillboard);	
			this.testBoard.apply();
			this.scene.pushMatrix();
				this.scene.scale(2, 1, 1);
				this.scene.translate(0 , 1.5 , 0);
				this.board.display();
			this.scene.popMatrix();

			this.testLeg.apply();
			this.scene.pushMatrix();
				this.scene.scale(1/10, 1, 1);
				this.scene.translate(9.5, 0.5 , 0);
				this.leg1.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.scale(1/10, 1, 1);
				this.scene.translate(-9.5 , 0.5 , 0);
				this.leg2.display();
			this.scene.popMatrix();

			
			// activate selected shader
			this.scene.setActiveShader(this.screenShader);
			this.testScreen.apply();
			this.scene.pushMatrix();
				this.scene.scale(1.5, 0.2, 1);
				this.scene.translate(0 , (1.25)*(1/0.2) , 0.001);
				this.screen.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);

		
	}
}

