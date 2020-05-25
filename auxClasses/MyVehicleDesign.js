/**
* MyVehicleDesing
* @constructor
*/
class MyVehicleDesign extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,0,1);         // vertice V
            this.vertices.push(ca, -sa, -1);
            this.vertices.push(caa, -saa, -1);

			// triangle normal computed by cross product of two edges
			/*  Normais anteriores para piramido a apontor nos YY
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
			]; 
			*/
			// Normais para piramido a apontor nos ZZ
            var normal= [
                saa-sa,
				caa-ca,
				ca*saa-sa*caa
			]; 

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            //this.indices.push(3*i, (3*i+1) , (3*i+2) ); // mostra interior da piramide
            this.indices.push(3*i, (3*i+2) , (3*i+1) ); // mostra exterior da piramide 

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


