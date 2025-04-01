from diffusers import StableDiffusionPipeline
import torch
import sys
import os

# Get the absolute path of the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
venv_path = os.path.join(script_dir, "venv")

if not os.path.exists(venv_path):
    print("Error: Virtual environment not found at", venv_path)
    sys.exit(1)

# Load the model inside the virtual environment
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float32)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")  # Use GPU if available

def generate_image(prompt, output_path):
    image = pipe(prompt).images[0]  # Generate image
    image.save(output_path)  # Save the image
    print(f"Image saved at: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_image.py '<prompt>' '<output_path>'")
        sys.exit(1)

    prompt = sys.argv[1]
    output_path = sys.argv[2]
    generate_image(prompt, output_path)