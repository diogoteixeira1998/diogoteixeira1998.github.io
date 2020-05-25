/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //-----Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //-----Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.cylinder = new MyCylinder(this, 10, 16);
        this.terrain = new MyTerrain(this);
        this.supply1 = new MySupply(this);
        this.supply2 = new MySupply(this);
        this.supply3 = new MySupply(this);
        this.supply4 = new MySupply(this);
        this.supply5 = new MySupply(this);
        this.billboard = new MyBillboard(this);
        // ---

        // --- Control flags
        this.nSuppliesDelivered=0;
        this.autoPilot = false;
        // ---

        //-----Objects connected to MyInterface
        this.displayAxis = false;
        this.enableNormals = false;

        this.displayTerrain = true;

        this.displayCylinder = false;
        this.scaleFactorCylinder = 1;

        this.displaySphere = false;
        this.scaleFactorSphere = 1;
        this.selectedTextureSphere = 0;

        this.displayCubeMap = true;
        this.selectedTextureCube = -1;

        this.displayVehicle = true;
        this.speedFactor = 1;
        this.scaleFactorVehicle = 1;

        this.displayBillboard = true;
        this.scaleFactorBillboard = 1;
        // ---

        //------ Textures options
        this.textureEarth = new CGFtexture(this, 'images/sphere/earth.jpg');
        this.textureCubeMap = new CGFtexture(this, 'images/cubemap/cubemap.png');
        this.textureGrass = new CGFtexture(this, 'images/cubemap/split_cubemap/bottom.png');
		this.textureEye = new CGFtexture(this, 'images/cubemap/eye.png');
        this.textureDesert = new CGFtexture(this, 'images/cubemap/desert.png');
        this.textureForest = new CGFtexture(this, 'images/cubemap/forest.png');
        this.textureMountains = new CGFtexture(this, 'images/cubemap/mountains.png');
        this.textureMap2 = new CGFtexture(this, 'images/sphere/map2.png');
        this.textureTest = new CGFtexture(this, 'images/texture.jpg');
        this.textureTestCubeMap = new CGFtexture(this, 'images/cubemap/testCubeMap.jpg');

        //----- Options for Sphere
        this.textures = [this.textureEarth, this.textureCubeMap, this.textureGrass, this.textureMap2, this.textureTest];
        this.textureIds = { 'Earth': 0, 'CubeMap': 1, 'Grass': 2, 'ColorMap': 3, 'Test Texture': 4};

        //----- Options for cubeMap
        this.texturesCube = [this.textureCubeMap, this.textureEye, this.textureDesert, this.textureForest, this.textureMountains,this.textureTest,this.textureEarth, this.textureTestCubeMap ];
        this.textureCubeIds = { 'Normal':0 ,'Sky': 1,'Eye':2 ,'Desert': 3, 'Forest': 4, 'Mountains': 5, 'Test Texture': 6, 'Earth': 7, 'Test Cube':8};
     

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        // camera for CubeMap
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-50, 50, 50), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {

        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            if(!this.autoPilot){
                this.vehicle.accelarate(1);
            }
            text+=" W ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            if(!this.autoPilot){
                this.vehicle.accelarate(-1);
            }
            text+=" S ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            if(!this.autoPilot){
                this.vehicle.turn(1);
            }
            text+=" A ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            if(!this.autoPilot){
                this.vehicle.turn(-1);
            }
            text+=" D ";
            keysPressed=true;
        }
        if (!this.gui.isKeyPressed("KeyD") && !this.gui.isKeyPressed("KeyA")) {
            // if D and A are not being pressed then wing returns to normal position
            this.vehicle.reset_wing();
        }
        
        if (this.gui.isKeyPressed("KeyR")) {
            // reset position, supplies and autopilot
            this.vehicle.reset();
            this.supply1.reset();
            this.supply2.reset();
            this.supply3.reset();
            this.supply4.reset();
            this.supply5.reset();
            this.nSuppliesDelivered=0;
            this.autoPilot = false;
            text+=" R ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            
            // run supplies droped |  5=supplies, if supllies run iyt print supplies over
            switch(this.nSuppliesDelivered) {
                case 0:
                    this.supply1.drop(this.vehicle.position);
                    this.nSuppliesDelivered++;  
                    break;
                case 1:
                    this.supply2.drop(this.vehicle.position);  
                    this.nSuppliesDelivered++;  
                    break;
                case 2:
                    this.supply3.drop(this.vehicle.position);  
                    this.nSuppliesDelivered++;  
                    break;
                case 3:
                    this.supply4.drop(this.vehicle.position);  
                    this.nSuppliesDelivered++;  
                    break;
                case 4:
                    this.supply5.drop(this.vehicle.position);  
                    this.nSuppliesDelivered++;  
                    break;
                default:
                    console.log('SUPPLIES OVER!')
                    break;
            }
            
            text+=" L ";
            console.log(this.nSuppliesDelivered);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            // Activate autoPilot
            if(this.autoPilot){
                this.autoPilot = false;
            }
            else{
                this.autoPilot = true;
            }
            text+=" P ";
            keysPressed=true;
        }


        if (keysPressed)
            console.log(text);
        
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){

        // check what keys are being pressed
        this.checkKeys();

        this.billboard.getNsupplies(this.nSuppliesDelivered);

        this.vehicle.update(t);
        
        this.supply1.update(t);
        this.supply2.update(t);
        this.supply3.update(t);
        this.supply4.update(t);
        this.supply5.update(t);
    }

    initMaterials(){
        
        //------ Cylinder Material
		this.testCylinder = new CGFappearance(this);
		this.testCylinder.setAmbient(0.3, 0.3, 1, 1);
        this.testCylinder.setDiffuse(0.5, 0.5, 0.5, 1);
        this.testCylinder.setSpecular(0, 0, 0, 1);
        this.testCylinder.setEmission(1, 1, 1, 1);
		this.testCylinder.setShininess(10.0);
		this.testCylinder.loadTexture('images/sphere/earth.jpg');
		this.testCylinder.setTextureWrap('REPEAT', 'REPEAT');
        //------
        
        //------ Sphere Material
		this.testSphere = new CGFappearance(this);
		this.testSphere.setAmbient(0.3, 0.3, 1, 1);
        this.testSphere.setDiffuse(0.5, 0.5, 0.5, 1);
        this.testSphere.setSpecular(0, 0, 0, 1);
        this.testSphere.setEmission(1, 1, 1, 1);
		this.testSphere.setShininess(10.0);
		this.testSphere.loadTexture('images/sphere/earth.jpg');
		this.testSphere.setTextureWrap('REPEAT', 'REPEAT');
		//------
    }

    //Function that resets selected texture in testSphere Material
    updateAppliedTextureInSphere() {
        this.testSphere.setTexture(this.textures[this.selectedTextureSphere]);
    }
    //Function that resets selected texture in CubeMap Material
    updateAppliedTextureInCube() {
        if(this.selectedTextureCube!=0){

            // Mudar textura 
            // o (-1) existe porque o primeiro selecredTextureCube é a default e nao
            // tem realmente uma textura para carregar, ou seja não está no array de 
            // texturesCubes.
            this.cubeMap.front.setTexture(this.texturesCube[this.selectedTextureCube-1]);
            this.cubeMap.back.setTexture(this.texturesCube[this.selectedTextureCube-1]);
            this.cubeMap.right.setTexture(this.texturesCube[this.selectedTextureCube-1]);
            this.cubeMap.left.setTexture(this.texturesCube[this.selectedTextureCube-1]);
            this.cubeMap.top.setTexture(this.texturesCube[this.selectedTextureCube-1]);
            this.cubeMap.bottom.setTexture(this.texturesCube[this.selectedTextureCube-1]);

            // mudar coordenadas de textura dependendo da imagem
            this.cubeMap.updateCoords();

        } else{
            // voltar a textura normal, sao varias imagens por isso 
            // basta inicializrmos o cubo outra vez
            this.cubeMap.initMaterials();
            this.cubeMap.init();

        }

    }



    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        

        // ---- BEGIN Primitive drawing section
        
        // CUBEMAPbillboard
        if(this.displayCubeMap){
            this.cubeMap.display();
        }

        // SPHERE
        if(this.displaySphere){
            if(this.enableNormals){this.incompleteSphere.enableNormalViz();}
            else{this.incompleteSphere.disableNormalViz();}
            this.testSphere.apply();
            this.pushMatrix();
			this.scale(this.scaleFactorSphere, this.scaleFactorSphere, this.scaleFactorSphere);
            this.incompleteSphere.display();
            this.popMatrix();
        }

        // VEHICLE
        if(this.displayVehicle){
            this.vehicle.display();
        }

        // CYLINDER
        if(this.displayCylinder){
            if(this.enableNormals){this.cylinder.enableNormalViz();}
            else{this.cylinder.disableNormalViz();}
            this.testCylinder.apply();
            this.pushMatrix();
			this.scale(this.scaleFactorCylinder, this.scaleFactorCylinder*(2), this.scaleFactorCylinder);
            this.cylinder.display();
            this.popMatrix();
        }

        // TERRAIN
        if(this.displayTerrain){
            this.terrain.display();
        }

        // SUPPLIES
        this.supply1.display();
        this.supply2.display();
        this.supply3.display();
        this.supply4.display();
        this.supply5.display();

        //   BILLBOARD
        if (this.displayBillboard){
            this.billboard.display();
        }
        

        // ---- END Primitive drawing section
    }
}