export function hasCloudinaryEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
}

export async function uploadImageToCloudinary(
  file: File,
  folder = "portafolio/about"
) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloud || !preset) {
    throw new Error(
      "Faltan NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME o NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET en las variables de entorno."
    );
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", preset);
  body.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body }
  );

  const json = (await response.json()) as {
    secure_url?: string;
    error?: { message?: string };
  };

  if (!response.ok || !json.secure_url) {
    throw new Error(json.error?.message ?? "No se pudo subir la imagen.");
  }

  return json.secure_url;
}
