///////////////////////////////////////////////////////
// Ported from Reshade v2.x. Original by CeeJay.
// Displays the depth buffer: further away is more white than close by. 
// Use this to configure the depth buffer preprocessor settings
// in Reshade's settings. (The RESHADE_DEPTH_INPUT_* ones)
///////////////////////////////////////////////////////

#include "Reshade.fxh"

uniform float Threshold <
	ui_type = "drag";
	ui_min = 0.0; ui_max = 1.0;
	ui_tooltip = "The amount of contrast you want.";
> = 0.2;

uniform float Intensity <
	ui_type = "drag";
	ui_min = 0.0; ui_max = 2.0;
	ui_tooltip = "The amount of contrast you want.";
> = 0.250;

uniform int oncharscreen < source = "oncharscreen"; >;

void PS_Lightmap(in float4 position : SV_Position, in float2 texcoord : TEXCOORD0, out float3 color : SV_Target)
{
	color.rgb = tex2D(ReShade::LightBuffer, texcoord).rgb;
	color.rgb = color.rgb - Threshold;
	color.rgb = tex2D(ReShade::BackBuffer, texcoord).rgb + color.rgb*Intensity;
	if(oncharscreen || ReShade::GetLinearizedDepth(texcoord) >= 1) color = tex2D(ReShade::BackBuffer, texcoord).rgb;
}

technique P1_Light
{
	pass
	{
		VertexShader = PostProcessVS;
		PixelShader = PS_Lightmap;
	}
}
