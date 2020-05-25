attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float speedFlag;

varying vec2 vTextureCoord;

uniform float normScale;

void main() {
	vec3 offset_time=vec3(0.0,0.0,0.0);

	vTextureCoord= aTextureCoord;

	//variacao seno fixo na bandeira + offseto do seno varia no tempo * animacao com o tempo * bandeira oscila mais perto do final
	offset_time = vec3( 0.0, 0.0,-0.25*sin(aTextureCoord.s*10.0 + timeFactor) * sin(timeFactor*0.1*speedFlag+0.2) * aTextureCoord.s);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset_time, 1.0);
}