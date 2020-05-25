/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.rotationYY = 0;
        this.rotationYY_wing =0 ;
        this.speed = 0;
        this.position = [0, 0, 0];
        this.auxMoveHelice = 0;

        this.t_atual=0;
        this.t_anterior=0;

        this.update_aux = 0;
        
        this.init();
        this.initMaterials();
        this.update();
    }
    init() {

        this.rotationYY = 0;
        this.speed = 0;
        this.position = [0, 0, 0];

        this.rotationYY_wing=0;
        this.intialRotationAuto=0;
        this.initialRotationTime=0;

        this.t_atual=0;
        this.t_anterior=0;

        //this.pyramid = new MyVehicleDesign(this.scene, 4, 16);  // preliminar vehicle
        this.ballon = new MySphere(this.scene, 10, 8);
        this.cabinLimit1 = new MySphere(this.scene, 10, 8);
        this.cabinLimit2 = new MySphere(this.scene, 10, 8);
        this.motor1 = new MySphere(this.scene, 10, 8);
        this.motor2 = new MySphere(this.scene, 10, 8);
        this.cabin = new MyCylinder(this.scene, 10, 8);
        this.helice1 = new MyRectangle(this.scene);
        this.helice2 = new MyRectangle(this.scene);
        this.wing1 = new MyParallelogram(this.scene);
        this.wing2 = new MyParallelogram(this.scene);
        this.wing3= new MyParallelogram(this.scene);
        this.wing4 = new MyParallelogram(this.scene);
        this.flagFront = new MyPlaneAUX(this.scene, 20, 0, 1, 0, 1);
        this.flagBack = new MyPlaneAUX(this.scene, 20, 0, 1, 0, 1);
        this.flagHolder1 = new MyPlaneAUX(this.scene, 1, 0, 1, 0, 1);
        this.flagHolder2 = new MyPlaneAUX(this.scene, 1, 0, 1, 0, 1);
        
    }

    initMaterials(){
        //----- Vehicle
        this.testVehicle = new CGFappearance(this.scene);
        this.testVehicle.setAmbient(0.3, 0.3, 1, 1);
        this.testVehicle.setDiffuse(0.5, 0.5, 0.5, 1);
        this.testVehicle.setSpecular(0, 0, 0, 1);
        this.testVehicle.setEmission(0.3, 0.3, 1, 1);
        this.testVehicle.setShininess(10.0);
        //------

        //----- booth - mirror 212/225, 225/225, 236/225,
        this.mirror = new CGFappearance(this.scene);
        this.mirror.setAmbient(212/225, 225/225, 236/225, 1);
        this.mirror.setShininess(50.0);
        //------

        //----- Vehicle
        this.TextureBallon = new CGFappearance(this.scene);
        this.TextureBallon.setAmbient(0.3, 0.3, 1, 1);
        this.TextureBallon.setDiffuse(0.5, 0.5, 0.5, 1);
        this.TextureBallon.setSpecular(0, 0, 0, 1);
        this.TextureBallon.setEmission(1, 1, 1, 1);
		this.TextureBallon.setShininess(10.0);
		this.TextureBallon.loadTexture('images/ballon/MIEEC.png');
		this.TextureBallon.setTextureWrap('REPEAT', 'REPEAT');
        //------
        

        //----- Helice
        this.testHelice = new CGFappearance(this.scene);
        this.testHelice.setAmbient(1, 1, 0, 1);
        this.testHelice.setDiffuse(0, 0, 0, 1);
        this.testHelice.setSpecular(0, 0, 0, 1);
        this.testHelice.setEmission(1, 1, 0.2, 1);
        this.testHelice.setShininess(10.0);
        //------

        //----- Leme
        this.testWing = new CGFappearance(this.scene);
        this.testWing.setAmbient(0, 0,1, 1);
        this.testWing.setDiffuse(0, 0, 0, 1);
        this.testWing.setSpecular(0, 0, 0, 1);
        this.testWing.setShininess(10.0);
        //------

        //---- Flag
		this.testflag = new CGFappearance(this.scene);
		this.testflag.setAmbient(0.3, 0.3, 0.3, 1);
		this.testflag.setDiffuse(0.7, 0.7, 0.7, 1);
		this.testflag.setSpecular(0.0, 0.0, 0.0, 1);
		this.testflag.setShininess(120);
		this.texture_flag = new CGFtexture(this.scene, "images/flag/board.jpg");
		this.testflag.setTexture(this.texture_flag);
		this.testflag.setTextureWrap('REPEAT', 'REPEAT')
        this.shaderFlag = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        
        //---- Flag
		this.testflag2 = new CGFappearance(this.scene);
		this.testflag2.setAmbient(0.3, 0.3, 0.3, 1);
		this.testflag2.setDiffuse(0.7, 0.7, 0.7, 1);
		this.testflag2.setSpecular(0.0, 0.0, 0.0, 1);
		this.testflag2.setShininess(120);
		this.texture_flag = new CGFtexture(this.scene, "images/flag/white.jpg");
		this.testflag2.setTexture(this.texture_flag);
		this.testflag2.setTextureWrap('REPEAT', 'REPEAT')
		this.shaderFlag2 = new CGFshader(this.scene.gl, "shaders/flag2.vert", "shaders/flag.frag");
    }

    accelarate(val){
        if (val>0) {
            // increase speed
            this.speed = this.speed+(0.25 * this.scene.speedFactor);
        }
        if (val<=0) {
            // decrease speed
            this.speed = this.speed-(0.25 * this.scene.speedFactor);
        }

    }
    turn(val){
        if (val>0) {
            // turn left
            this.rotationYY = this.rotationYY+0.05;
            // rotate wings in the opposite direction 
            this.rotationYY_wing = -Math.PI/8;
        }
        if (val<=0) {
            // turn right 
            this.rotationYY = this.rotationYY-0.05;
            // rotate wings in the opposite direction 
            this.rotationYY_wing = +Math.PI/8;
        }
    }

    reset_wing(){
        // put wing in normal position when A and D are not being pressed
        this.rotationYY_wing = 0;
    }

    reset(){
        // reset vehicle to its inicial position
        this.rotationYY = 0;
        this.speed = 0;
        this.position = [0, 0, 0];
    }

    auto(){
        
        // mark speed and pace of rotation for the auto pilot
        this.speed =  (2*Math.PI*5)/5;
        this.rotationYY = this.rotationYY + (2*Math.PI/100);

        if((this.rotationYY-this.intialRotationAuto) > (2*Math.PI) && (this.rotationYY-this.intialRotationAuto) < (2*Math.PI+0.1)){
            //console.log('volta completa');
            //console.log((this.t_atual-this.initialRotationTime)/1000)
        }
   }

    update(t){

        // update position for 
        if (this.update_aux == 1){
            this.t_atual = t;
            this.position = [(this.speed*(this.t_atual-this.t_anterior)/1000)*Math.sin(this.rotationYY) + this.position[0], this.position[1] , (this.speed*(this.t_atual-this.t_anterior)/1000)*Math.cos(this.rotationYY) + this.position[2]]
            this.t_anterior = t;
        } // just runs at init to set position
        else if(this.update_aux == 0){
            this.position = [0, 0, 0];
            this.update_aux = 1;
        }

        // values updated to flag shaders, time and speed
        this.shaderFlag.setUniformsValues({timeFactor: t / 100 % 1000 });
        this.shaderFlag.setUniformsValues({speedFlag: this.speed });
    
        if(this.scene.autoPilot){
            this.auto();
        }
        else{
            this.intialRotationAuto = this.rotationYY;
            this.initialRotationTime = this.t_atual;
        }
    }

    display(){

        // DisplayNormals
        //if(this.scene.enableNormals){this.pyramid.enableNormalViz();}
        //else{this.pyramid.disableNormalViz();}
        
        // Draw
        this.scene.pushMatrix();

            //---movement
            this.scene.translate(this.position[0], this.position[1]+10, this.position[2] );
            this.scene.rotate(this.rotationYY, 0, 1, 0);
            //---scale factor
            this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);

            this.TextureBallon.apply();
            //---ballon
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(1, 2, 1);
                this.ballon.display();
            this.scene.popMatrix();

            
            this.mirror.apply();
            //---cabin
            this.scene.pushMatrix();
                this.scene.translate(0, -1, 0);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(0.15, 1.2, 0.15);
                this.cabin.display();
            this.scene.popMatrix();

            //---cabin points
            this.scene.pushMatrix();
                this.scene.translate(0, -1, 0.5*1.2);
                //this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(0.15, 0.15, 0.15);
                this.cabinLimit1.display();
            this.scene.popMatrix();

            //---cabin points
            this.scene.pushMatrix();
                this.scene.translate(0, -1, -0.5*1.2);
                //this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(0.15, 0.15, 0.15);
                this.cabinLimit2.display();
            this.scene.popMatrix();

            //---motor1 
            this.scene.pushMatrix();
                this.scene.translate(0.15, -1, -0.5*1.2);
                this.scene.scale(0.05, 0.05, 0.15);
                this.motor1.display();
            this.scene.popMatrix();

            //---motor2
            this.scene.pushMatrix();
                this.scene.translate(-0.15, -1, -0.5*1.2);
                this.scene.scale(0.05, 0.05, 0.15);
                this.motor2.display();
            this.scene.popMatrix();

            this.testHelice.apply();
            //---helice2
            this.scene.pushMatrix();
                this.scene.translate(-0.15, -1, -0.5*1.2-0.15*1);
                this.scene.rotate( this.speed*(this.auxMoveHelice)-Math.PI/6,0,0,1);
                this.scene.scale(0.1, 0.02, 1);
                this.helice2.display();
            this.scene.popMatrix();

            //---helice1
            this.scene.pushMatrix();
                this.scene.translate(0.15, -1, -0.5*1.2-0.15*1);
                this.scene.rotate( this.speed*(this.auxMoveHelice)+Math.PI/6,0,0,1);
                this.scene.scale(0.1, 0.02, 1);
                this.helice1.display();
            this.scene.popMatrix();

            this.testWing.apply();
            //---wing1 1 - top vertical
            this.scene.pushMatrix();
                this.scene.translate(0, 0.5, -2);
                this.scene.rotate(-Math.PI/2 ,0,1,0);

                this.scene.rotate(this.rotationYY_wing ,0,1,0);  

                this.scene.scale(0.7, 0.7, 0.7);
                this.wing1.display();
            this.scene.popMatrix();

            //---wing 2- bottom vertical
            this.scene.pushMatrix();
                this.scene.translate(0, -0.5, -2);
                this.scene.rotate(-Math.PI/2 ,0,1,0);
                this.scene.rotate(Math.PI ,1,0,0);

                this.scene.rotate(-this.rotationYY_wing ,0,1,0);

                this.scene.scale(0.7, 0.7, 0.7);
                this.wing1.display();
            this.scene.popMatrix();

            //---wing 3- right
            this.scene.pushMatrix();
                this.scene.translate(-0.7, 0, -2);
                this.scene.rotate(-Math.PI/2 ,0,1,0);
                this.scene.rotate(Math.PI/2 ,1,0,0);
                this.scene.scale(0.7, 0.7, 0.7);
                this.wing3.display();
            this.scene.popMatrix();

            //---wing 4 - right
            this.scene.pushMatrix();
                this.scene.translate(0.7, 0, -2);
                this.scene.rotate(-Math.PI/2 ,0,1,0);
                this.scene.rotate(-Math.PI/2 ,1,0,0);
                this.scene.scale(0.7, 0.7, 0.7);
                this.wing4.display();
            this.scene.popMatrix();

            //--flag (front)
            this.scene.setActiveShader(this.shaderFlag);
            this.testflag.apply();
            
            this.scene.pushMatrix();
                this.scene.translate(0, 0, -4);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.scale(2, 1, 1)
                this.flagFront.display();
            this.scene.popMatrix();

            // -- flag (back)
            this.scene.setActiveShader(this.shaderFlag2);
            this.testflag2.apply();
            this.scene.pushMatrix();
                this.scene.translate(0, 0, -4);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.scale(2, 1, 1)
                this.flagBack.display();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);

            // --- flagHolder1
            this.scene.pushMatrix();
                this.scene.translate(0, 0, -2);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.scale(2, 0.05, 1)
                this.flagHolder1.display();
            this.scene.popMatrix();
            // --- flagHolder2
            this.scene.pushMatrix();
             this.scene.translate(0, 0, -2);
             this.scene.rotate(Math.PI/2, 0, 1, 0);
             this.scene.scale(2, 0.05, 1)
             this.flagHolder1.display();
            this.scene.popMatrix();

            // --- flagHolder3
            this.scene.pushMatrix();
                this.scene.translate(0, 0, -2.99);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.scale(0.03, 1, 1)
                this.flagHolder1.display();
            this.scene.popMatrix();
            // --- flagHolder4
            this.scene.pushMatrix();
             this.scene.translate(0, 0, -2.99);
             this.scene.rotate(Math.PI/2, 0, 1, 0);
             this.scene.scale(0.03, 1, 1)
             this.flagHolder1.display();
            this.scene.popMatrix();



        this.scene.popMatrix();
        

        // incrementar variavel usada na amimacao das helices
        this.auxMoveHelice = this.auxMoveHelice+0.1;



    }
}


