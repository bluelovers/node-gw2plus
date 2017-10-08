#include "ReShade.fxh"

texture FALLumTex0 { Width = 255; Height = 255; Format = RGBA16; };
sampler FALLumSampler0 { Texture = FALLumTex0;};
texture FALLumTex1 { Width = 255; Height = 1; Format = RGBA16; };
sampler FALLumSampler1 { Texture = FALLumTex1;};
texture FALLumTex2 { Width = 1; Height = 1; Format = RGBA16; };
sampler FALLumSampler2 { Texture = FALLumTex2;};

texture FALAdapTex { Width = 1; Height = 1; Format = RGBA16; };
sampler FALAdapSampler { Texture = FALAdapTex;};

#define HDRLumArea 0.5

uniform float HDRContrast <
	ui_type = "drag";
	ui_min = 1.0; ui_max = 10.0;
	ui_tooltip = "1";
> = 1.2;

float3 contrast(float3 color, float val, float amount){
	color.r = (color.r - val)*amount + val;
	color.g = (color.g - val)*amount + val;
	color.b = (color.b - val)*amount + val;
	return color;
}

float FALLumPass0(in float4 pos : SV_Position, in float2 texcoord : TEXCOORD) : COLOR {
	float3 color = tex2D(ReShade::BackBuffer, (texcoord*HDRLumArea + (1-HDRLumArea)/2)).rgb;
	return (0.2126*color.r + 0.7152*color.g + 0.0722*color.b);
}

float FALLumPass1(in float4 pos : SV_Position, in float2 texcoord : TEXCOORD) : COLOR {
	float cumul = 0;
	float2 coord;
	for (float y = 0; y < 254; ++y){
		coord = float2(texcoord.x, y/255);
		cumul += tex2D(FALLumSampler0, coord).r;
	}
	return cumul/255;
}

float FALLumPass2(in float4 pos : SV_Position, in float2 texcoord : TEXCOORD) : COLOR {
	float cumul = 0;
	for (float x = 0; x < 254; ++x){
		cumul += tex2D(FALLumSampler1, float2(x/255 + 1/512, 0.5)).r;
	}
	cumul = cumul/255;
	//return cumul;
	if (abs(tex2D(FALAdapSampler, float2(0.5,0.5)).r - cumul) < 0.005){
		return cumul;
	} else if (tex2D(FALAdapSampler, float2(0.5,0.5)).r < cumul){
		cumul = tex2D(FALAdapSampler, float2(0.5,0.5)).r+0.0025;
	} else {
		cumul = tex2D(FALAdapSampler, float2(0.5,0.5)).r-0.0025;
	}
	return cumul;
}

float FALAdapPass(in float4 pos : SV_Position, in float2 texcoord : TEXCOORD) : COLOR {
	return tex2D(FALLumSampler2, float2(0.5,0.5)).r;
}

float3 FALContrPass(in float4 pos : SV_Position, in float2 texcoord : TEXCOORD) : COLOR {
	float3 color = tex2D(ReShade::BackBuffer, texcoord).rgb;
	return contrast(color, tex2D(FALLumSampler2, float2(0.5,0.5)).r, HDRContrast);
}

technique HDR
{
	pass FALAdap {
		VertexShader = PostProcessVS;
		PixelShader = FALAdapPass;
		RenderTarget = FALAdapTex;
	}
	
	pass FALLum0 {
		VertexShader = PostProcessVS;
		PixelShader = FALLumPass0;
		RenderTarget = FALLumTex0;
	}
	
	pass FALLum1 {
		VertexShader = PostProcessVS;
		PixelShader = FALLumPass1;
		RenderTarget = FALLumTex1;
	}
	
	pass FALLum2 {
		VertexShader = PostProcessVS;
		PixelShader = FALLumPass2;
		RenderTarget = FALLumTex2;
	}
	
	pass FALContr {
		VertexShader = PostProcessVS;
		PixelShader = FALContrPass;
	}
}