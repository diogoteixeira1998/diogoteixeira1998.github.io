/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys(){
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox element in GUI
        this.gui.add(this.scene, 'enableNormals').name('Display Normals');

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayTerrain').name('Terrain');

        //----------------------------------------------
        // Forlder for grouping the CUBEMAP parameters |
        //----------------------------------------------
        var CubeMapFolder = this.gui.addFolder('CubeMap');
        //Checkbox element in GUI
        CubeMapFolder.add(this.scene, 'displayCubeMap').name('CubeMap');
        //Dropdown for textures
        CubeMapFolder.add(this.scene, 'selectedTextureCube', this.scene.textureCubeIds).name('Selected Texture').onChange(this.scene.updateAppliedTextureInCube.bind(this.scene));
        //----------------------------------------------


        //----------------------------------------------
        // Forlder for grouping the SPHERE parameters |
        //----------------------------------------------
        var SphereFolder = this.gui.addFolder('Sphere');
            //Slider element in GUI
            SphereFolder.add(this.scene, 'scaleFactorSphere', 0.5, 20.0).name('Scale Factor');
            //Checkbox element in GUI
            SphereFolder.add(this.scene, 'displaySphere').name('Sphere');
            //Dropdown for textures
            SphereFolder.add(this.scene, 'selectedTextureSphere', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTextureInSphere.bind(this.scene));

        //----------------------------------------------  

        //----------------------------------------------
        // Forlder for grouping the CYLINDER parameters |
        //----------------------------------------------
        var CylinderFolder = this.gui.addFolder('Cylinder');
            //Slider element in GUI
            CylinderFolder.add(this.scene, 'scaleFactorCylinder', 0.5, 10.0).name('Scale Factor');
            //Checkbox element in GUI
            CylinderFolder.add(this.scene, 'displayCylinder').name('Cylinder');
        //----------------------------------------------   

        //----------------------------------------------
        // Forlder for grouping the VEHICLE parameters |
        //----------------------------------------------
        var VehicleFolder = this.gui.addFolder('Vehicle');
            //Slider element in GUI
            VehicleFolder.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed Factor');
            //Slider element in GUI
            VehicleFolder.add(this.scene, 'scaleFactorVehicle', 0.5, 3.0).name('Scale Factor');
            //Checkbox element in GUI
            VehicleFolder.add(this.scene, 'displayVehicle').name('Vehicle');
        //----------------------------------------------    

        //----------------------------------------------
        // Forlder for grouping the BILLBOARD parameters |
        //----------------------------------------------
        var BillboardFolder = this.gui.addFolder('Billboard');
            //Slider element in GUI
            BillboardFolder.add(this.scene, 'scaleFactorBillboard', 1, 3.0).name('Scale Factor');
            //Checkbox element in GUI
            BillboardFolder.add(this.scene, 'displayBillboard').name('Billboard');
        //----------------------------------------------    


        this.initKeys();

        return true;
    }
}