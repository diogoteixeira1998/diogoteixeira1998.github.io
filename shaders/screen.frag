#ifdef GL_ES
precision highp float;
#endif


varying vec3 vVertexPosition;
uniform float nSupllies;

void main() {

        if(((vVertexPosition.x+0.5)/1.0)>((nSupllies)/5.0)){
            gl_FragColor =  vec4(0.5,0.5,0.5, 1.0);
        }
	    else{
            gl_FragColor =  vec4(1.0-((vVertexPosition.x+0.5)/1.0),((vVertexPosition.x+0.5)/1.0),0.0, 1.0);
        }

}