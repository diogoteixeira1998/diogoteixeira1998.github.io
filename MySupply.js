/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
		super(scene);

		const SupplyStates = {
			INACTIVE: 0,
			FALLING: 1,
			LANDED: 2
		};

		this.state=SupplyStates.INACTIVE;

		// initial condition for supply, acelaratian = 2 para respeitar temop de queda de 3 seg
		this.speed = 0;
		this.acelaration = 2;
        this.position = [0, 0, 0];

		this.t_atual=0;
		this.t_inicial=0;
        this.t_anterior=0;
		this.t_elapsed=0;
		this.t_inicialAUX=false;

		this.init();
		this.initMaterials();
		this.update();

	}
	init() {
		this.state=0;

        this.position = [0, 0, 0];

		this.t_atual=0;
		this.t_inicial=0;
        this.t_anterior=0;
		this.t_elapsed=0;
		this.t_inicialAUX=false;
		
		// 6 faces do cubo
		this.plane1 = new MyQuad(this.scene);
		this.plane2 = new MyQuad(this.scene);
		this.plane3 = new MyQuad(this.scene);
		this.plane4 = new MyQuad(this.scene);
		this.plane5 = new MyQuad(this.scene);
		this.plane6 = new MyQuad(this.scene);
	}

	initMaterials(){

		//------ Side
		this.side = new CGFappearance(this.scene);
		this.side.setAmbient(0.1, 0.1, 0.1, 1);
		this.side.setDiffuse(0.9, 0.9, 0.9, 1);
		this.side.setSpecular(0.1, 0.1, 0.1, 1);
		this.side.setEmission(1, 1, 1, 1);
		this.side.setShininess(10.0);
		this.side.loadTexture('images/supply/supplyOutside.jpg');
		this.side.setTextureWrap('REPEAT', 'REPEAT');
		//------

		//------ RadioActive
		this.radio = new CGFappearance(this.scene);
		this.radio.setAmbient(0.1, 0.1, 0.1, 1);
		this.radio.setDiffuse(0.9, 0.9, 0.9, 1);
		this.radio.setSpecular(0.1, 0.1, 0.1, 1);
		this.radio.setEmission(1, 1, 1, 1);
		this.radio.setShininess(10.0);
		this.radio.loadTexture('images/supply/supply_radioactive.jpeg');
		this.radio.setTextureWrap('REPEAT', 'REPEAT');
		//------
	}


	drop(position_vehicle){
		this.state=1;
		this.position=position_vehicle;
    }

    land(){
		// confirma se o objeto já chegou o ao chão, quando chega muda o estado para LANDED e imprime
		// o tempo de queda
		if(this.position[1]>9){
			if(this.state==1) console.log('fall time =',this.t_elapsed);
			this.state=2;
		}
	}
	
	reset(){
		this.state=0;

        this.position = [0, 0, 0];


		// var usadas para contar o tempo de queda dos supplies
        this.t_atual=0;
		this.t_inicial=0;
        this.t_anterior=0;
		this.t_elapsed=0;
		this.t_inicialAUX=false;
	}

    update(t){
		
		// conta o tempo de queda e calcula a posição do vaículo emquato no estado FALING
		if(this.state==1){
			if(!this.t_inicialAUX){
				this.t_inicial=t;
				this.t_inicialAUX=true;
			}
			this.t_atual = t;
			this.t_elapsed=(this.t_atual-this.t_inicial)/1000;
			// posição calculada através das eq de movimento
			this.position = [this.position[0], (this.t_elapsed*this.speed+this.t_elapsed**2*(this.acelaration/2)), this.position[2]];
			this.t_anterior = t;
		}
		
		this.land();
	}
	
	displayFall(){
		this.scene.pushMatrix();

		//---movement
		this.scene.translate(this.position[0], -this.position[1]+9+0.5, this.position[2] );


		this.radio.apply();
		//------------------------
		//         TOP           |
		//------------------------
		//plane3 Y+
		this.scene.pushMatrix();
			this.scene.translate(0 , 0.5 , 0);
			this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
			this.plane3.display();
		this.scene.popMatrix();
		
		//------------------------
		//        BOTTOM         |
		//------------------------
		//plane4 Y-
		this.scene.pushMatrix();
			this.scene.translate(0 , -0.5 , 0);
			this.scene.rotate(Math.PI/2 , 1 ,0, 0);
			this.plane4.display();
		this.scene.popMatrix();

		//------------------------
		//         SIDES         |
		//------------------------
		//plane1 Z+
		this.scene.pushMatrix();
			this.scene.translate(0 , 0 , 0.5);
			this.plane1.display();
		this.scene.popMatrix();

		//plane2 Z-
		this.scene.pushMatrix();
			this.scene.translate(0 , 0 , -0.5);
			this.scene.rotate(Math.PI , 1 ,0, 0);
			this.scene.rotate(Math.PI , 0 ,0, 1); //imagem fica invertida sem esta rotação
			this.plane2.display();
		this.scene.popMatrix();
		
		//plane5 X+
		this.scene.pushMatrix();
			this.scene.translate(0.5 , 0 , 0);
			this.scene.rotate(Math.PI/2 , 0 ,1, 0);
			this.plane5.display();
		this.scene.popMatrix();

		//plane6 X-
		this.scene.pushMatrix();
			this.scene.translate(-0.5 , 0 , 0);
			this.scene.rotate(-Math.PI/2 , 0 ,1, 0);
			this.plane5.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
	}

	displayLanded(){
		this.scene.pushMatrix();

				this.scene.translate(this.position[0],0.1,this.position[2])

				this.side.apply();

				//------------------------
				//         TOP           |
				//------------------------
				//plane3 Y+
				this.scene.pushMatrix();
					this.scene.translate(2 , 0, 0);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane3.display();
				this.scene.popMatrix();

				//------------------------
				//        BOTTOM         |
				//------------------------
				//plane4 Y-
				this.scene.pushMatrix();
					this.scene.translate(0 , 0 , 0);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane4.display();
				this.scene.popMatrix();

				//------------------------
				//         SIDES         |
				//------------------------
				this.scene.pushMatrix();
					this.scene.translate(0 , 0 , 1);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane1.display();
				this.scene.popMatrix();

				//plane2 Z-
				this.scene.pushMatrix();
					this.scene.translate(0 , 0 , -1);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane2.display();
				this.scene.popMatrix();
				
				//plane5 X+
				this.scene.pushMatrix();
					this.scene.translate(1 , 0 , 0);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane5.display();
				this.scene.popMatrix();

				//plane6 X-
				this.scene.pushMatrix();
					this.scene.translate(-1 , 0 , 0);
					this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
					this.plane6.display();
				this.scene.popMatrix();

			this.scene.popMatrix();
	}

	display(){

		if(this.state==1){  //----FALLING-------
			this.displayFall();

		}
		else if(this.state==2){   //----LANDED-------

			this.displayLanded();	
		}

	}

}

