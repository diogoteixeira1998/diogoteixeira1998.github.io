#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

	// varia com a 'cor' ou seja com a textura do waterTex (agua)
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2 (0.0,0.0)+vTextureCoord);

	//if (filter.b > 0.5)
	//	color=vec4(color.r*1.05, color.g*1.05, color.b*1.05, 1.0);

	
	gl_FragColor = color;
}