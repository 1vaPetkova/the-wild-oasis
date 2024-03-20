import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted!");
  }
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random().toFixed(1)}-${
    newCabin.image.name
  }`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://czdteeaqrrsrhhiwtaeo.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg
  //1. Create the cabin
  let query = supabase.from("cabins");

  // A) CREATE
  query = query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2. If the creation is successful - then upload the image
  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      contentType: "image/jpeg",
    });

  //3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created! - ${storageError}`
    );
  }
  return data;
}
